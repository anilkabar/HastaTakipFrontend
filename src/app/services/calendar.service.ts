import { Injectable } from '@angular/core';
import {CalendarOptions} from "@fullcalendar/core";
import allLocales from "@fullcalendar/core/locales-all";
import {MeetingaddComponent} from "../components/meeting/meetingadd/meetingadd.component";
import {MeetingService} from "./meeting.service";
import {DynamicdialogService} from "./dynamicdialog.service";

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  constructor(
    private meetingService:MeetingService,
    private dynamicModal:DynamicdialogService
  ) { }

  calendar(data:any){
    let CalendarOptions;
    return CalendarOptions = {
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
        },
        buttonText:{
          next:'İleri',
          prev:'Geri'
        },
        initialView: 'dayGridMonth',
        dateClick: this.handleDateClick.bind(this), // bind is important!
        dayMaxEventRows: true, // for all non-TimeGrid views
        views: {
          timeGrid: {
            dayMaxEventRows: 1 // adjust to 6 only for timeGridWeek/timeGridDay
          }
        },
        events:data,
        buttonIcons:{
          next:'chevron-left'
        },
        themeSystem:'',
        //droppable:true,

        //türkçe dil desteği sağlamak için ikisi kullanılmalı
        locale:'tr',
        locales:allLocales,
        weekends: true,
        //editable: true,
        selectable: true,
        selectMirror: true,
        dayMaxEvents: true,

    }
  }

  handleDateClick(arg:{dateStr:string}) {

    //console.log(this.meetingModel?.data)
    /*this.meetingEventArray.forEach(f=>{
      console.log(f[0])
    })
     */
    this.meetingService.meetingDate=arg.dateStr;
    //this.meetingDate.date='2022-11-02';
    this.dynamicModal.show(MeetingaddComponent,'Randevu Ekle',40,'top');
  }

}
