import { Injectable } from '@angular/core';
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {MessageService} from "primeng/api";
import {MeetingaddComponent} from "../components/meeting/meetingadd/meetingadd.component";

@Injectable({
  providedIn: 'root'
})
export class DynamicdialogService {

  ref!: DynamicDialogRef;
  constructor(
    public dialogService: DialogService, public messageService: MessageService,
  ) { }

  show(component:any,header:any,width:any,position:any){
    this.ref=this.dialogService.open(component, {
      header: header,
      width: width+'%',
      contentStyle: {"overflow": "auto"},
      baseZIndex: 10000,
      maximizable: true,
      closable:true,
      position:position,
    });
  }
}
