import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BaseService} from "./Base.service";
import {
  PatientExaminationData,
  PatientExaminationItem,
  PatientExaminationModel
} from "../models/PatientExaminationModel";
import {Observable} from "rxjs";
import {PatientDocumentItem} from "../models/PatientDocumentModel";

@Injectable({
  providedIn: 'root'
})
export class PatientexaminationService {

  url="PatientExamination/"
  getAllByPatientExamination="getAllByPatientExaminationPatientId/";

  constructor(
    private http:HttpClient,
    private base:BaseService,
  ) { }

  save(examinationAdd:any){
    return this.base.httpBase?.post<PatientExaminationItem>(this.base.baseURL+this.url+this.base.save,examinationAdd,{headers:this.base.jwtTokenController()});
  }

  getAllByPatientExaminationPatientId(id: number | undefined):Observable<PatientExaminationModel> | undefined{
    return this.base.httpBase?.get<PatientExaminationModel>(this.base.baseURL+this.url+this.getAllByPatientExamination+id,{headers:this.base.jwtTokenController()});
  }

  deleteById(id:number |undefined){
    return this.base.httpBase?.delete<PatientDocumentItem>(this.base.baseURL+this.url+this.base.deleteById+id,{headers:this.base.jwtTokenController()});
  }
}
