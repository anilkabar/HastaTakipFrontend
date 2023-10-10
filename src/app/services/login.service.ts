import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {BaseService} from "./Base.service";
import {HttpClient} from "@angular/common/http";
import {StockItem} from "../models/StockModel";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(

   private base:BaseService,
  ) { }
  loginUrl='login/Giris'

  login(login:any){
    return this.base.httpBase?.post<any>(this.base.baseURL+this.loginUrl,login);
  }

}
