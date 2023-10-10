import {BaseModel} from "./BaseModel";

export interface PageAdminModel {
  status:boolean,
  message:string,
  data:PageAdminData[],
}

export interface PageAdminItem{
  status:boolean,
  message:string,
  data:PageAdminData,
}
export class PageAdminData extends BaseModel{
  name?:string
  controllerName?:string
}
