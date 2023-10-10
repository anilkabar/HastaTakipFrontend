import { DoctorModel } from './../models/DoctorModel';
import { Injectable } from '@angular/core';
import { BaseService } from './Base.service';

@Injectable({
  providedIn: 'root'
})
export class DoctorService{

constructor(public base:BaseService) { }
doctorURL='Doctor/'
geAllCompanyIdURL='getAllCompanyId/'

getAll(){
  return this.base.httpBase?.get<DoctorModel>(this.base.baseURL+this.doctorURL+this.base.getAll,{headers:this.base.jwtTokenController()})
}


getAllCompanyId(id:any){
  return this.base.httpBase?.get<DoctorModel>(this.base.baseURL+this.doctorURL+this.geAllCompanyIdURL+id,{headers:this.base.jwtTokenController()})
}

}
