import {BaseModel} from "./BaseModel";

export interface UserAuthorityModel {
  status:boolean;
  message:string;
  data:UserAuthorityData[];
}

export interface CityItem {
  status:boolean;
  message:string;
  data:UserAuthorityData;
}
export class UserAuthorityData extends BaseModel{
pageAdminId?:number
}
export class UserAuthority extends BaseModel{
  pageAdminId?:number
  isActive?:Boolean
  userId?:number
}


