import {BaseModel} from "./BaseModel";
import {StockModelData} from "./StockModelModel";
import {PatientData} from "./PatientModel";

export interface StockSaleModel{
  status:boolean;
  message:string;
  data:StockSaleModelData[];
}
export interface StockSaleItem{
  status:boolean;
  message:string;
  data:StockSaleModelData;
}



export class StockSaleModelData extends BaseModel{
  salePrice?:number;
  buyPrice?:number;
  information?:string;
  stockDto?:StockModelData;
  patientDto?:PatientData;

}
