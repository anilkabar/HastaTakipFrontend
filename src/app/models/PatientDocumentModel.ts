import {BaseModel} from "./BaseModel";
import {PatientData} from "./PatientModel";

export interface PatientDocumentModel {
  status:boolean;
  message:string;
  data:PatientDocumentData[];

}

export interface PatientDocumentItem{
  status:boolean;
  message:string;
  data:PatientDocumentData
}

export class PatientDocumentData extends BaseModel{
  name?:string;
  path?:string;
  patientDto?:PatientData

}




