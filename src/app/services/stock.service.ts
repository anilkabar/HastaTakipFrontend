import { Injectable } from '@angular/core';
import {BaseService} from "./Base.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {StockItem, StockModel} from "../models/StockModel";

@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(
    private base:BaseService,
    private http:HttpClient
  ) { }
  stockUrl="Stock/"
  stockGetAllCompanyIdUrl="stockGetAllCompanyId/"

  save(stockAdd:any):Observable<StockItem> |undefined{
    return this.base.httpBase?.post<StockItem>(this.base.baseURL+this.stockUrl+this.base.save,stockAdd,{headers:this.base.jwtTokenController()});
  }

  getAll(){
    return this.base.httpBase?.get<StockModel>(this.base.baseURL+this.stockUrl+this.base.getAll,{headers:this.base.jwtTokenController()});
  }
  stockGetAllCompanyId(id:any){
    return this.base.httpBase?.get<StockModel>(this.base.baseURL+this.stockUrl+this.stockGetAllCompanyIdUrl+id,{headers:this.base.jwtTokenController()});
  }
}
