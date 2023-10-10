import { Injectable } from '@angular/core';
import {BaseService} from "./Base.service";
import {UserModel, UserModelItem} from "../models/UserModel";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  userUrl="UserDetail/"
  userCompanyIdGetAllUrl="userCompanyGetAll/";
  userisActiveUpdateUrl="userisActiveUpdate/"

  constructor(
    private base:BaseService
  ) { }

  userCompanyIdGetAll(id:any){
    return this.base.httpBase?.get<UserModel>(this.base.baseURL+this.userUrl+this.userCompanyIdGetAllUrl+id,{headers:this.base.jwtTokenController()});
  }

  update(model:any){
    return this.base.httpBase?.post<UserModelItem>(this.base.baseURL+this.userUrl+this.userisActiveUpdateUrl,model,{headers:this.base.jwtTokenController()})
  }

}
