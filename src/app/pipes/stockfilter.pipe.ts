import { Pipe, PipeTransform } from '@angular/core';
import {StockModel} from "../models/StockModel";

@Pipe({
  name: 'stockfilter'
})
export class StockfilterPipe implements PipeTransform {

  constructor(
  ) {
  }


  transform(stock:StockModel,filterText?:any):any {
    return stock.data.filter(f=>{
      f.serialNumber.indexOf(filterText)
    })
  }

}
