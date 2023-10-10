import { Injectable } from '@angular/core';
import {BaseService} from "./Base.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PatientDocumentData, PatientDocumentItem, PatientDocumentModel} from "../models/PatientDocumentModel";

@Injectable({
  providedIn: 'root'
})
export class PatientdocumentService {

  patientDocumentUrl="PatientDocument/";
  patientDocumentPatientId="getAllPatientDocumentPatientId/";

  constructor(
    private base:BaseService,
    private http:HttpClient
  ) { }

  save(patientDocumentDto:any,file:any):Observable<PatientDocumentItem> |undefined{
    const formData=new FormData();
    formData.append("file",file);
    formData.append("patientDocumentDto",new Blob([JSON.stringify(patientDocumentDto)],{
      type:"application/json"
    }))
    return this.base.httpBase?.post<PatientDocumentItem>(this.base.baseURL+this.patientDocumentUrl+this.base.save,formData)
  }
  getAllPatientDocumentPatientId(id:number |undefined):Observable<PatientDocumentModel> |undefined{
    return this.base.httpBase?.get<PatientDocumentModel>(this.base.baseURL+this.patientDocumentUrl+this.patientDocumentPatientId+id,{headers:this.base.jwtTokenController()});
  }

  deleteById(id:number){
    return this.base.httpBase?.delete<PatientDocumentItem>(this.base.baseURL+this.patientDocumentUrl+this.base.deleteById+id,{headers:this.base.jwtTokenController()});
  }

}
