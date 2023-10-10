import { Component, OnInit } from '@angular/core';
import {StockService} from "../../../services/stock.service";
import {StockModel} from "../../../models/StockModel";
import {filter, retry} from "rxjs";

@Component({
  selector: 'app-stocklist',
  templateUrl: './stocklist.component.html',
  styleUrls: ['./stocklist.component.css']
})
export class StocklistComponent implements OnInit {

  stockModel:StockModel |undefined;
  filterStockModel:StockModel |undefined;
  filterText?:any
  size:any;
  companyId=sessionStorage.getItem("companyId")

  perPage=9;
  selectedPage=1;


  constructor(
    private stockService:StockService,

  ) {

    //this.filterStockModel=this.stockModel;
  }

  ngOnInit(): void {
    this.stockGetAllCompanyId();
    this.stockFilter();

  }


  stockGetAllCompanyId(){
    this.stockService.stockGetAllCompanyId(this.companyId)?.subscribe(item=>{
      this.stockModel=item;
    })
  }

stockFilter(){
    return this.stockModel?.data?.filter(f=>
      f.serialNumber.indexOf(this.filterText)!=-1 || f.stockModelDto?.name?.toLowerCase().indexOf(this.filterText.toLowerCase())!=-1 || f.stockModelDto?.stockBrandDto?.name?.toLowerCase().indexOf(this.filterText.toLowerCase())!=-1)

}


  get pageNumber():number[]{
    this.size=this.stockModel?.data.length;
    this.size=this.size? this.size:20
    if (this.filterText){
      this.size=this.stockFilter()?.length
    }
    return  Array(Math.ceil(this.size/this.perPage))
      .fill(0)
      .map((a,i)=>i+1)

  }

  get stockAll():any{
    let start=(this.selectedPage-1)*this.perPage;
    if (this.filterText){
      return this.stockFilter()?.slice(start,start+this.perPage);
    }
    return this.stockModel?.data.slice(start,start+this.perPage)
  }



  changePage(p:number){
    this.selectedPage=p;
  }

}
