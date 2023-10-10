import {Component, EventEmitter, Injectable, OnInit, Output, ViewChild} from '@angular/core';
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {MessageService} from "primeng/api";
import {DynamicdialogService} from "../../services/dynamicdialog.service";
import {MeetingEvent, MeetingModel} from "../../models/MeetingModel";
import {MeetingService} from "../../services/meeting.service";
import {CalendarService} from "../../services/calendar.service";



@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.css']
})


export class MeetingComponent implements OnInit {

  meetingEventArray:Array<any>=[];
  meetingModel:MeetingModel |undefined;
  calendarOptions!:any;
  @Output() close: EventEmitter<void> = new EventEmitter();
  constructor(
    public dialogService: DialogService,
    public messageService: MessageService,
    private dynamicModal:DynamicdialogService,
    private meetingService:MeetingService,
    private calendar:CalendarService,
  )
  {
  }

  ngOnInit(): void {
    this.getAllMeeting();
    console.log("Meeting Çağrıldı")


  }
  closes(){
    this.close.emit(this.getAllMeeting());
  }

  getAllMeeting(){
    this.meetingService.getAll()?.subscribe(data=>{
     data.data.forEach(f=>{
       const model:MeetingEvent={
       }
       model.id=f.id;
       model.date=f.meetingDate;
       model.title=f.name;
       this.meetingEventArray.push(model);
     })
      this.calendarOptions=this.calendar.calendar(this.meetingEventArray);
    })
  }


}
