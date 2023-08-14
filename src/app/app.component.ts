import {ChangeDetectorRef, Component} from '@angular/core';
import {rosbag_metadata} from "./features/interfaces/rosbag_metadata";
import {IpcRenderer} from "electron";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private select_topic?:string[];
  metadata:rosbag_metadata={
    name:"",
    duration:false,
    duration_value:0,
    maxsize:false,
    maxsize_value:256,
    records_limit:false,
    records_limit_value:1000
  };
  private ipc!: IpcRenderer;
  public rostopic_list:string[]=[]
  public fisrt_request:boolean=false;
  record_visible:boolean=false;
  roscore_visible:boolean=false;
  recorder_visible: boolean=false;



  constructor(private cdr: ChangeDetectorRef) {
    if (window.require) {
      try {
        this.ipc = window.require('electron').ipcRenderer;
      } catch (error) {
        throw error;
      }
    } else {
      console.warn('Could not load electron ipc');
    }
    this.ipc.on('rostopic_list_result', (event, arg) => {
      this.rostopic_list = arg.split('\n');
      this.roscore_visible = this.rostopic_list.length <= 1;
      this.cdr.detectChanges();

    });
    this.ipc.on('record_rosbag_answer', (event, arg) => {
      if(arg.status==="end_record")
      {
        this.record_visible=false;
        this.recorder_visible=true;


      }
      this.refresh()
    });
    this.get_rostopic_list()
  }

  start_record()
  {

    if(this.select_topic?.length)
    {
      this.ipc.send('record_rosbag', {metadata:this.metadata, topics:this.select_topic});
      this.record_visible=true;
    }else{
      alert("Select topics to record")
    }
    // Wysyłanie zapytania o listę rostopiców

  }

  get_rostopic_list()
  {


    // Wysyłanie zapytania o listę rostopiców
    this.ipc.send('get_rostopic_list');
  }

  handleSelectTopic(strings: string[]) {
    this.select_topic=strings;
  }

  handleRosbagMetadata(meta:rosbag_metadata){
    this.metadata=meta;
    this.start_record()
  }

  refresh() {
    this.cdr.detectChanges();
  }

  handleStopRecord() {
    this.ipc.send('stop_record_rosbag', {});
  }

  try_ros() {
    this.get_rostopic_list();
  }


}
