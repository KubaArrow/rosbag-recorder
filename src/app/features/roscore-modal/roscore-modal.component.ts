import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-roscore-modal',
  templateUrl: './roscore-modal.component.html',
  styleUrls: ['./roscore-modal.component.css']
})
export class RoscoreModalComponent {
  @Output() refresh = new EventEmitter<void>();

  @Input ({required:true}) visible: boolean=false;


  refresh_ros() {
    this.refresh.emit();
  }
}
