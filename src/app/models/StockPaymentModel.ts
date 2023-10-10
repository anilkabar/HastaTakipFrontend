import {BaseModel} from "./BaseModel";
import {StockSaleModelData} from "./StockSaleModel";
import {PatientData} from "./PatientModel";

export interface StockPaymentModel {
  status:boolean;
  message:string;
  data:StockPaymentData[];

}
export interface StockPaymentItem{
  status:boolean;
  message:string;
  data:StockPaymentData

}

export class StockPaymentData extends BaseModel{
  paymentAmount?:number;
  paymentType?:number;
  information?:string;
  stockSaleDto?:StockSaleModelData;
  patientDto?:PatientData;


}
