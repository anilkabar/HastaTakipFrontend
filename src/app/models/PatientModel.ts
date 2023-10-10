//import { CompanyData } from './Company';
import { DoctorData } from './DoctorModel';
import {Enum} from "../enum/Enum";
import {CompanyData} from "./CompanyModel";
export interface PatientModel {
  status:boolean;
  message:string;
  data:PatientData[];
}

export interface PatientItem{
  status:boolean;
  message:string;
  data:PatientData;
}

export class PatientData{
  id?:number;
  identificationNumber!:string;
  name!:string;
  surname!:string;
  dateofBirth?:Date;
  phone?:string;
  email?:string;
  adress?:string;
  imagePath?:string;
  gender?:Enum;
  company?:CompanyData;
  doctor?:DoctorData;
 //company:CompanyData
 /*
 document:string;
 note:string;
 examinations:string;
 */

}
