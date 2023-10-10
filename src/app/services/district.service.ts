import { Injectable } from '@angular/core';
import {BaseService} from "./Base.service";
import {DistrictItem, DistrictModel} from "../models/DistrictModel";

@Injectable({
  providedIn: 'root'
})
export class DistrictService {

  constructor(
    private base:BaseService
  ) { }

  districtUR='District/'
  findAllByCity='findAllByCityId/'

  getAllCityId(id:any){
    return this.base.httpBase?.get<DistrictModel>(this.base.baseURL+this.districtUR+this.findAllByCity+id,{headers:this.base.jwtTokenController()})
  }

}
