import {Injectable} from '@angular/core';
import {BaseService} from "./Base.service";
import {UserAuthorityModel} from "../models/UserAuthorityModel";

@Injectable({
  providedIn: 'root'
})
export class UserauthorityService {

  userAuthorityUrl="UserAuthority/"
  getAllUserIdUrl="getAllUserId/"
  saveAndFlushUrl="saveAndFlush/"

  constructor(
    public base:BaseService,
  ) {
  }

  getAllUserAuthorityByUserId(id:number){
    return this.base.httpBase?.get<UserAuthorityModel>(this.base.baseURL+this.userAuthorityUrl+this.getAllUserIdUrl+id,{headers:this.base.jwtTokenController()})
  }

  saveAndFlush(model:any){
    return this.base.httpBase?.post<UserAuthorityModel>(this.base.baseURL+this.userAuthorityUrl+this.saveAndFlushUrl,model,{headers:this.base.jwtTokenController()})

  }
}
