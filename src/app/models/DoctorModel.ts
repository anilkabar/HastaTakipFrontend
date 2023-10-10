import { CompanyData } from './CompanyModel';
export interface DoctorModel {
  status:boolean;
  message:string;
  data:DoctorData[];
}

export interface DoctorItem{
  status:boolean;
  message:string;
  data:DoctorData;
}

export interface DoctorData{
  id?:number;
  data:Date;
  isActive:boolean;
  surname:string;
  address:string;
  email:string;
  name:string;
  phone:string;
  company:CompanyData;

}

