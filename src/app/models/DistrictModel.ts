import {CityData} from "./CityModel";

export interface DistrictModel {
  status:boolean;
  message:string;
  data:DistrictData[];
}

export interface DistrictItem {
  status:boolean;
  message:string;
  data:DistrictData;
}
export interface DistrictData{
  id?:number;
  name:string;
  city:CityData
}
