import { Injectable } from '@angular/core';
import {BaseService} from "./Base.service";
import {MeetingData, MeetingItem, MeetingModel} from "../models/MeetingModel";

@Injectable({
  providedIn: 'root'
})
export class MeetingService {

  meetingUrl="Meeting/"

  meetingDate!:string;
  meetingRefres:any;

  constructor(
    private base:BaseService
  ) { }

  save(meetingData:any){
    return this.base.httpBase?.post<MeetingItem>(this.base.baseURL+this.meetingUrl+this.base.save,meetingData,{headers:this.base.jwtTokenController()});
  }

  getAll(){
    return this.base.httpBase?.get<MeetingModel>(this.base.baseURL+this.meetingUrl+this.base.getAll,{headers:this.base.jwtTokenController()});
  }



}
