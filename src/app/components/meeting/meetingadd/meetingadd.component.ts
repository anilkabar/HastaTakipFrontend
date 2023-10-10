import {Component, EventEmitter, Injectable, OnInit, ViewChild} from '@angular/core';
import {DialogService, DynamicDialogModule, DynamicDialogRef} from "primeng/dynamicdialog";
import {MessageService} from "primeng/api";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MeetingData, MeetingEvent, MeetingModel} from "../../../models/MeetingModel";
import {MeetingService} from "../../../services/meeting.service";
import {DatePipe} from "@angular/common";
import {DoctorService} from "../../../services/Doctor.service";
import {DoctorData, DoctorModel} from "../../../models/DoctorModel";
import {Sweetalert2Service} from "../../../services/sweetalert2.service";
import {DynamicdialogService} from "../../../services/dynamicdialog.service";
import {MeetingComponent} from "../meeting.component";
import {takeWhile, window} from "rxjs";
import {CalendarService} from "../../../services/calendar.service";




@Component({
  selector: 'app-meetingadd',
  templateUrl: './meetingadd.component.html',
  styleUrls: ['./meetingadd.component.css']
})
export class MeetingaddComponent implements OnInit {
  formGroup!:FormGroup;
  meetingData!:MeetingData;
  meetingDate!:string
  meetingHour:Array<any>=[];
  meetingMinute:Array<any>=[];
  doctor!:DoctorModel;
  doctorData:DoctorData |undefined;
  meeting:MeetingComponent |undefined;


  constructor(
    public dialogService: DialogService,
    public messageService: MessageService,
    private formBuilder:FormBuilder,
    private meetingService:MeetingService,
    private datePipe:DatePipe,
    private doctorService:DoctorService,
    private sweetalert:Sweetalert2Service,
    private dynamicDialog:DynamicdialogService,

  ) { }

  ngOnInit(): void {

    this.doctorGetAll();
    this.meetingDate=this.meetingService.meetingDate;
    this.formGroupMeeting();
    this.meetingHours();
    this.meetingMinutes();
    console.log(this.meeting?.getAllMeeting())
  }
  doctorGetAll(){
    this.doctorService.getAll()?.subscribe(data=>{
      this.doctor=data;
    })
  }

  doctorSelected(){
    this.doctorData=this.doctor?.data.find(f=>{
      return f.id==this.formGroup.value.doctor;
    })
  }


  formGroupMeeting(){
    this.formGroup=this.formBuilder.group({
      name:[''],
      meetingDate:[{value:this.meetingDate,disabled:true},[Validators.required]],
      doctor:[''],
      surname:[''],
      meetingHour:['00'],
      meetingMinute:['00'],
      information:['']

    })
  }
  meetingHours(){
    for (let i=0;i<=24;i++){
      if (i<10){
        this.meetingHour.push('0'+i);
      }
      else{
        this.meetingHour.push(i);
      }

    }
  }
  meetingMinutes(){
    for (let i=0;i<=55;i+=10){
      if(i==0){
        this.meetingMinute.push('00')
      }
      else{
        this.meetingMinute.push(i)
      }

    }
  }

  save(){
    let meetingDate=this.meetingService.meetingDate+" "+this.formGroup.value.meetingHour+":"+this.formGroup.value.meetingMinute;
    this.formGroup.value.meetingDate=new Date(meetingDate);
    let model={
     name:this.formGroup.value.name,
     surname:this.formGroup.value.surname,
     meetingDate:this.formGroup.value.meetingDate,
     information:this.formGroup.value.information,
     doctorDto:this.doctorData,
    }
    this.meetingService.save(model)?.subscribe(data=>{
      if (data.status){
        this.sweetalert.toastSuccess(data.message);
        this.formGroup.reset();
        this.dynamicDialog.ref.close();
        //this.meeting.getAllMeeting()
      }
    })


  }







}
