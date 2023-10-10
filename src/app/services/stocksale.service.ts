import { Injectable } from '@angular/core';
import {BaseService} from "./Base.service";
import {Base} from "crypto-ts/src/lib/Base";
import {StockModelItem} from "../models/StockModelModel";
import {StockSaleItem, StockSaleModel} from "../models/StockSaleModel";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StocksaleService{

  stockSaleUrl="StockSale/"
  getAllByPatient="getAllByPatientId/"
  findByPatientCompanyIdUrl="findByPatientCompanyId/"

  constructor(
    private base:BaseService
  ) { }

  save(data:any){
    return this.base.httpBase?.post<StockSaleItem>(this.base.baseURL+this.stockSaleUrl+this.base.save,data,{headers:this.base.jwtTokenController()});
  }
  getAll(){
    return this.base.httpBase?.get<StockSaleModel>(this.base.baseURL+this.stockSaleUrl+this.base.getAll,{headers:this.base.jwtTokenController()});
  }
  getAllByPatientId(id:number |undefined){
    return this.base.httpBase?.get<StockSaleModel>(this.base.baseURL+this.stockSaleUrl+this.getAllByPatient+id,{headers:this.base.jwtTokenController()});
  }

  deleteById(id:any){
    return this.base.httpBase?.delete<StockSaleItem>(this.base.baseURL+this.stockSaleUrl+this.base.deleteById+id,{headers:this.base.jwtTokenController()});
  }

  getAllByPatientSaleCompanyId(id:any){
    return this.base.httpBase?.get<StockSaleModel>(this.base.baseURL+this.stockSaleUrl+this.findByPatientCompanyIdUrl+id,{headers:this.base.jwtTokenController()});
  }


}
