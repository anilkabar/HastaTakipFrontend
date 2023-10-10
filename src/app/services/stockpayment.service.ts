import { Injectable } from '@angular/core';
import {BaseService} from "./Base.service";
import {StockPaymentItem, StockPaymentModel} from "../models/StockPaymentModel";

@Injectable({
  providedIn: 'root'
})


export class StockpaymentService  {

  stockPaymentUrl="StockPayment/";
  findAllStockPaymentPatientIdUrl="findAllStockPaymentPatientId/";
  findAllPatientCompanyIdUrl="findAllPatientCompanyId/";

  constructor(
    private base:BaseService
  ) { }

  save(data:any){
    return this.base.httpBase?.post<StockPaymentModel>(this.base.baseURL+this.stockPaymentUrl+this.base.save,data,{headers:this.base.jwtTokenController()})
  }
  deleteById(id:number){
    return this.base.httpBase?.delete<StockPaymentItem>(this.base.baseURL+this.stockPaymentUrl+this.base.deleteById+id,{headers:this.base.jwtTokenController()});
  }


  findAllByPatientId(id:number){
    return this.base.httpBase?.get<StockPaymentModel>(this.base.baseURL+this.stockPaymentUrl+this.findAllStockPaymentPatientIdUrl+id,{headers:this.base.jwtTokenController()});
  }

  findAllPatientCompanyId(id:any){
    return this.base.httpBase?.get<StockPaymentModel>(this.base.baseURL+this.stockPaymentUrl+this.findAllPatientCompanyIdUrl+id,{headers:this.base.jwtTokenController()});
  }


}
