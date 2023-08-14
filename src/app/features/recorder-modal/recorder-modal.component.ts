import { Component, Input} from '@angular/core';

@Component({
  selector: 'app-recorder-modal',
  templateUrl: './recorder-modal.component.html',
  styleUrls: ['./recorder-modal.component.css']
})
export class RecorderModalComponent {
  @Input ({required:true}) visible: boolean=false;

}
