const {app, BrowserWindow, ipcMain} = require('electron');
const {exec} = require('child_process');
require('electron-reload')(__dirname, {
    ignored: /.*\.bag$/,
    electron: require(`${__dirname}/node_modules/electron`)
});


let win;

function createWindow() {
    win = new BrowserWindow({
        width: 600,
        height: 400,
        resizable: false,
        webPreferences: {
            webSecurity: false,
            nodeIntegration: true,
            contextIsolation: false,
        },
    });
    //win.setMenu(null);
    //Auto reload
    //win.loadURL(`http://localhost:4200/`);
    win.loadFile('dist/rosbag-recorder/index.html');

}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (win === null) {
        createWindow();
    }
});

function getRostopicList(event) {
    exec('rostopic list', (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            event.sender.send('rostopic_list_result', "");
            return;
        }
        // Wysyłanie wyników do procesu renderującego
        event.sender.send('rostopic_list_result', stdout);
    });
}


ipcMain.on('get_rostopic_list', (event) => {
    getRostopicList(event);
});

let rosbag_recorder = null;


ipcMain.on('record_rosbag', (event, args) => {
    // Jeśli poprzedni proces rosbag jest aktywny, zakończ go
    if (rosbag_recorder) {
        rosbag_recorder.kill('SIGINT');
    }

    let homeDirectory = process.env.HOME || process.env.USERPROFILE;
    let commend = `rosbag record -O ${homeDirectory}/${args.metadata.name}.bag `;

    if (args.metadata.duration) {
        commend += `--duration=${args.metadata.duration_value} `;
    }
    if (args.metadata.maxsize) {
        commend += `--buffsize=${args.metadata.maxsize_value} `;
    }
    if (args.metadata.records_limit) {
        commend += `--limit=${args.metadata.records_limit_value} `;
    }
    for (let topic_name of args.topics) {
        commend += `${topic_name} `;
    }

    event.sender.send('record_rosbag_answer', {status: "start_record"});


    rosbag_recorder = exec(commend, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        event.sender.send('record_rosbag_answer', { status: "error_record", value: stderr });
      }
        event.sender.send('record_rosbag_answer', { status: "end_record", value: stdout });

    });
});


ipcMain.on('stop_record_rosbag', (event, args) => {

    exec(`ps aux | grep "/opt/ros/noetic/bin/rosbag"`, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }

        // Analiza stdout, aby znaleźć PID
        const lines = stdout.split('\n');
        for (let line of lines) {
            if (line.includes('/opt/ros/noetic/bin/rosbag') && line.includes('record')) {
                const parts = line.split(/\s+/);
                const pid = parts[1];  // PID jest zwykle w drugiej kolumnie
                exec(`kill ${pid}`, (killError) => {
                    if (killError) {
                        console.error(`Błąd podczas zabijania procesu: ${killError}`);
                    } else {
                        event.sender.send('record_rosbag_answer', { status: "end_record", value: stdout });
                    }
                });
            }
        }
    });

});
