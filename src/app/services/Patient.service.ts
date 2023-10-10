import {PatientModel, PatientData, PatientItem} from './../models/PatientModel';
import {Injectable} from '@angular/core';
import {BaseService} from './Base.service';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';
import {compareSegments} from "@angular/compiler-cli/src/ngtsc/sourcemaps/src/segment_marker";

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private base: BaseService, private http: HttpClient) {
  }

  patientURL = "Patient/"
  patientDetail = "Patient/Detail"
  upload = "upload"
  file:File |undefined;

  header = {
    headers: new HttpHeaders({

      'Content-Type': 'multipart/form-data',
      'Authorization': 'Token'
    })
  }


  save(patientDto: any, file2: any): Observable<PatientItem> | undefined {
    const formData = new FormData();

    //formData.append("patientDto",patientDto)
    console.log(file2)
    if (file2 != undefined) {
      formData.append("file",file2)
    }
    formData.append("file",new Blob([JSON.stringify("false")],{
      type:"aplication/json"
    }))
    formData.append('patientDto', new Blob([JSON.stringify(patientDto)], {
      type: "application/json"
    }))
    const httpHeader = {
      headers: new HttpHeaders({
        'Content-Type': 'multipart/form-data',
        'Authorization': 'Token'
      })
    }

    const head = new HttpHeaders();
    head.set('Authorization', 'Token')
    head.set('Content-Type', 'application/json')

    return this.base.httpBase?.post<PatientItem>(this.base.baseURL + this.patientURL + this.base.save, formData,{headers:this.base.jwtTokenController()});

  }

  getAll(id:string): Observable<PatientModel> | undefined {
    return this.base.httpBase?.get<PatientModel>(this.base.baseURL + this.patientURL + this.base.getAllById+id,{headers:this.base.jwtTokenController()});
  }

  getById(patientId: number): Observable<PatientItem> | undefined {

    return this.base.httpBase?.get<PatientItem>(this.base.baseURL + this.patientURL + this.base.getById + patientId,{headers:this.base.jwtTokenController()})
  }


}
