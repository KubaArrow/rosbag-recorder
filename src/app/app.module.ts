import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TopicListComponent } from './features/topic-list/topic-list.component';
import {CheckboxModule} from "primeng/checkbox";
import {FormsModule} from "@angular/forms";
import { PanelComponent } from './features/panel/panel.component';
import {InputTextModule} from "primeng/inputtext";
import {InputNumberModule} from "primeng/inputnumber";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import { RecordModalComponent } from './features/record-modal/record-modal.component';
import {DialogModule} from "primeng/dialog";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { RoscoreModalComponent } from './features/roscore-modal/roscore-modal.component';
import { RecorderModalComponent } from './features/recorder-modal/recorder-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    TopicListComponent,
    PanelComponent,
    RecordModalComponent,
    RoscoreModalComponent,
    RecorderModalComponent
  ],
    imports: [
        BrowserModule,
        CheckboxModule,
        FormsModule,
        InputTextModule,
        InputNumberModule,
        ButtonModule,
        RippleModule,
        DialogModule,
        BrowserAnimationsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
