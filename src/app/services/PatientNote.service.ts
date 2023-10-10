import {PatientNoteData, PatientNoteItem, PatientNoteModel} from './../models/PatientNoteModel';
import {catchError, Observable, retry, tap} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './Base.service';
import {PatientData, PatientItem, PatientModel} from "../models/PatientModel";
import {Token} from "@angular/compiler";

@Injectable({
  providedIn: 'root'
})
export class PatientNoteService {
constructor(private base:BaseService,private http:HttpClient) { }

patientNoteURL="PatientNote/";
patientNotePatientId="getAllPatientNotePatientId/";
  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
getById(){
  return this.base.httpBase?.get<PatientNoteModel>(this.base.baseURL+this.patientNoteURL+this.base.getAll,{headers:this.base.jwtTokenController()})
}
getAllPatientNotePatientId(id:any):Observable<PatientNoteModel> |undefined{
  return this.base.httpBase?.get<PatientNoteModel>(this.base.baseURL+this.patientNoteURL+this.patientNotePatientId+id,{headers:this.base.jwtTokenController()});
}
getAll():Observable<PatientNoteModel> |undefined{
  return this.base.httpBase?.get<PatientNoteModel>(this.base.baseURL+this.patientNoteURL+this.base.getAll,{headers:this.base.jwtTokenController()})
}


deleteById(id:number){
  return this.base.httpBase?.delete<PatientNoteItem>(this.base.baseURL+this.patientNoteURL+this.base.deleteById+id,{headers:this.base.jwtTokenController()});
}
save(parientNoteAdd:any):Observable<PatientNoteItem> |undefined{
  //return this.base.httpBase?.post<Patient>(this.base.baseURL+this.patientURL+this.patientNoteSave,JSON.stringify(parientNoteAdd),this.httpOptions)

  const httpHeader={
    headers:new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization':'Token'
    })
  }

  return this.base.httpBase?.post<PatientNoteItem>(this.base.baseURL+this.patientNoteURL+this.base.save,parientNoteAdd,{headers:this.base.jwtTokenController()})
  //return this.base.httpBase?.post(this.base.baseURL+this.patientURL+this.patientNoteSave,parientNoteAdd)
}

}
