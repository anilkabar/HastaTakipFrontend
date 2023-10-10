import { PatientData } from "./PatientModel";

export interface PatientNoteModel {
  status:boolean;
  message:string;
  data:PatientNoteData[];
}

export interface PatientNoteItem{
  status:boolean;
  message:string;
  data:PatientNoteData;

}

export interface PatientNoteData{
  id?:number;
 content:string;
 date:Date;
 patientDto:PatientData;
}


