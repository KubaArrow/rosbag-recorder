import {ChangeDetectorRef, Component, EventEmitter, Output} from '@angular/core';
import {rosbag_metadata} from "../interfaces/rosbag_metadata";
import {IpcRenderer} from "electron";

@Component({
    selector: 'app-panel',
    templateUrl: './panel.component.html',
    styleUrls: ['./panel.component.css']
})
export class PanelComponent {
    private ipc!: IpcRenderer;

    public data: rosbag_metadata = {
        name: "",
        duration: false,
        duration_value: 0,
        maxsize: false,
        maxsize_value: 256,
        records_limit: false,
        records_limit_value: 1000
    };


    @Output() record = new EventEmitter<rosbag_metadata>();


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
    }

    start_record() {
        if(this.data.duration&&this.data.records_limit)
        {
            alert("Only duration or records limit")
        }else{
            this.record.emit(this.data)

        }
    }

    refresh() {
        this.cdr.detectChanges()
    }

}
