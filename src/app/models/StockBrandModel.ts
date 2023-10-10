import {BaseModel} from "./BaseModel";
import {CompanyData} from "./CompanyModel";

export interface StockBrandModel {
  status:boolean;
  message:string;
  data:StockBrandData[];
}

export interface StockBrandItem{
  status:boolean;
  message:string;
  data:StockBrandData;

}

export class StockBrandData extends BaseModel{
  name?:string;
  company?:CompanyData;
}
