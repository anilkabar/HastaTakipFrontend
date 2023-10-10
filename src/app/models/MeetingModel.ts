import {BaseModel} from "./BaseModel";
import {DoctorData} from "./DoctorModel";

export interface MeetingModel {
  status:boolean;
  message:string;
  data:MeetingData[];
}

export interface MeetingItem{
  status:boolean;
  message:string;
  data:MeetingData;

}

export class MeetingData extends BaseModel{
  name?:string;
  surname?:string;
  meetingDate?:Date;
  information?:string;
  doctor?:DoctorData;

}

export interface MeetingEventVeri{
  data:MeetingEvent[]
}

export class MeetingEvent{
  id?:number;
  title?:string;
  date?:any;


}
