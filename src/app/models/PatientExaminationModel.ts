import {BaseModel} from "./BaseModel";
import {PatientData} from "./PatientModel";

export interface PatientExaminationModel {
  status:boolean;
  message:string;
  data:PatientExaminationData[]

}
export interface PatientExaminationItem{
  status:boolean;
  message:string;
  data:PatientExaminationData

}
export class PatientExaminationData extends BaseModel{
  doctorDiagnosis?:string;
  patientComplaint?:string;
  treatmentAdministered?:string;
  patientDto?:PatientData

}
