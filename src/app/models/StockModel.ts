import {BaseModel} from "./BaseModel";
import {CompanyData} from "./CompanyModel";
import {StockModelData} from "./StockModelModel";

export interface StockModel {
  status:boolean;
  message:string;
  data:StockData[];
}
export interface StockItem{
  status:boolean;
  message:string;
  data:StockData;
}

export class StockData extends BaseModel{
  serialNumber!:string;
  stockAmount!:number;
  price!:number;
  companyDto!:CompanyData
  stockModelDto!:StockModelData

}

