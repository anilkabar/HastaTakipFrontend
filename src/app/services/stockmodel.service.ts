import { Injectable } from '@angular/core';
import {BaseService} from "./Base.service";
import {StockModelItem, StockModelModel} from "../models/StockModelModel";

@Injectable({
  providedIn: 'root'
})
export class StockModelService {

  stockModelUrl="StockModel/";

  constructor(
    private base:BaseService
  ) { }

  save(stockModelAdd:any){
    return this.base.httpBase?.post<StockModelItem>(this.base.baseURL+this.stockModelUrl+this.base.save,stockModelAdd,{headers:this.base.jwtTokenController()})
  }

  getAll(){
    return this.base.httpBase?.get<StockModelModel>(this.base.baseURL+this.stockModelUrl+this.base.getAll,{headers:this.base.jwtTokenController()})
  }
  deleteById(id:number){
    return this.base.httpBase?.delete<StockModelItem>(this.base.baseURL+this.stockModelUrl+this.base.deleteById+id,{headers:this.base.jwtTokenController()})
  }


}
