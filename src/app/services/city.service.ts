import {Injectable} from '@angular/core';
import {BaseService} from "./Base.service";
import {CityModel} from "../models/CityModel";

@Injectable({
  providedIn: 'root'
})
export class CityService {

  cityUrl="City/"

  constructor(
    public base:BaseService,
  ) {
  }

  getAll() {
    return this.base.httpBase?.get<CityModel>(this.base.baseURL+this.cityUrl+this.base.getAll,{headers:this.base.jwtTokenController()});
  }
}
