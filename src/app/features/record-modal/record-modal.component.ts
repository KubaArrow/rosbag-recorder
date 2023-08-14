import {Component, EventEmitter, Input, Output} from '@angular/core';
import {rosbag_metadata} from "../interfaces/rosbag_metadata";

@Component({
  selector: 'app-record-modal',
  templateUrl: './record-modal.component.html',
  styleUrls: ['./record-modal.component.css']
})
export class RecordModalComponent {
  @Input ({required:true}) visible: boolean=false;
  @Input() meta!:rosbag_metadata;
  @Output() stop_record = new EventEmitter<void>();


  stop_recording() {
    this.stop_record.emit()
  }
}
