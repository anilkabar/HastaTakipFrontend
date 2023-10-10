import {BaseModel} from "./BaseModel";
import {StockBrandData} from "./StockBrandModel";

export interface StockModelModel{
  status:boolean;
  message:string;
  data:StockModelData[];
}
export interface StockModelItem{
  status:boolean;
  message:string;
  data:StockModelData;
}



export class StockModelData extends BaseModel{
  name?:string;
  stockBrandDto?:StockBrandData;
}
