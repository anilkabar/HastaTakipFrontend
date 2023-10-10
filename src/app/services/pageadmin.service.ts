import { Injectable } from '@angular/core';
import {BaseService} from "./Base.service";
import {PageAdminModel} from "../models/PageAdminModel";

@Injectable({
  providedIn: 'root'
})
export class PageadminService {

  pageAdminURL="PageAdmin/"
  constructor(
    private base:BaseService
  ) { }

  getAll(){
    return this.base.httpBase?.get<PageAdminModel>(this.base.baseURL+this.pageAdminURL+this.base.getAll,{headers:this.base.jwtTokenController()})
  }
}
