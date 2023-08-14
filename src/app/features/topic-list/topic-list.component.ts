import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import {IpcRenderer} from "electron";


interface RostopicCheckbox{
  name: string,
  checked: boolean,
}
@Component({
  selector: 'app-topic-list',
  templateUrl: './topic-list.component.html',
  styleUrls: ['./topic-list.component.css']
})
export class TopicListComponent  implements OnInit, OnChanges {

  @Input ({required:true}) rostopic_list: string[]=[];


  public rostopics: RostopicCheckbox[] = []
  private ipc!: IpcRenderer;
  select_all_checkbox: boolean=false;


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


  @Output() change_topics = new EventEmitter<string[]>();
  @Output() refresh_topics = new EventEmitter<void>();

  change_topic_func()
  {
    let topic_list:string[]=[]
    this.rostopics.forEach(topic=>{
      if(topic.checked){
        topic_list.push(topic.name);
      }
    });
    this.change_topics.emit(topic_list)
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['rostopic_list'] && !changes['rostopic_list'].isFirstChange()) {

      this.rostopics = this.convertTopicsToCheckboxes(this.rostopic_list);
    }
  }

  ngOnInit() {
    this.rostopics = this.convertTopicsToCheckboxes(this.rostopic_list);

  }

  public refresh_topic_list()
  {
    this.refresh_topics.emit();
  }


  private convertTopicsToCheckboxes(topics: string[]): RostopicCheckbox[] {
    this.select_all_checkbox=false;
    const checkboxes: RostopicCheckbox[] = [];
    topics.forEach(topic => {
      if(topic!='')
      {
        let existingTopic:RostopicCheckbox = {
          name: topic,
          checked: false,
        };
        checkboxes.push(existingTopic)
      }

    });

    return checkboxes;
  }



  markAll() {

    for(let topic of this.rostopics)
    {
      topic.checked = this.select_all_checkbox;
    }

    this.refresh()
  }



  refresh() {
    this.change_topic_func();
    this.cdr.detectChanges();
  }
}
