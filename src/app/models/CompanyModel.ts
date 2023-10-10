export interface CompanyModel {
  status:boolean;
  message:string;
  data:CompanyData[];
}
export interface CompanyItem{
  status:boolean;
  message:string;
  data:CompanyData;
}
export class CompanyData{
  id?:number;
  name?:string;
}
export class CompanyId{
  id?:number;
}
