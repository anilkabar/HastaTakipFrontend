import { Injectable } from '@angular/core';
import {BaseService} from "./Base.service";
import {DoctorModel} from "../models/DoctorModel";
import {StockBrandItem, StockBrandModel} from "../models/StockBrandModel";
import {PatientNoteItem} from "../models/PatientNoteModel";

@Injectable({
  providedIn: 'root'
})
export class StockbrandService {
  stockBrandUrl="StockBrand/";
  stockBrandCompanyGetAllUrl="stockBrandCompanyGetAll/"

  constructor(
    private base:BaseService
  ) { }


  getAll(){
    //return this.base.httpBase?.get<DoctorModel>(this.base.baseURL+this.doctorURL+this.base.getAll)
    return this.base.httpBase?.get<StockBrandModel>(this.base.baseURL+this.stockBrandUrl+this.base.getAll,{headers:this.base.jwtTokenController()})
  }

  save(stockBrandAdd:any){
    return this.base.httpBase?.post<StockBrandItem>(this.base.baseURL+this.stockBrandUrl+this.base.save,stockBrandAdd,{headers:this.base.jwtTokenController()})
  }

  stockBrandCompanyGetAll(id:any){
    return this.base.httpBase?.get<StockBrandModel>(this.base.baseURL+this.stockBrandUrl+this.stockBrandCompanyGetAllUrl+id,{headers:this.base.jwtTokenController()})
  }

}
