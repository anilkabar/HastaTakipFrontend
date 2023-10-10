import { Component, OnInit } from '@angular/core';
import {StocksaleService} from "../../../../services/stocksale.service";
import {StockSaleModelData} from "../../../../models/StockSaleModel";
import {StockPaymentData} from "../../../../models/StockPaymentModel";
import {StockpaymentService} from "../../../../services/stockpayment.service";
import {computeStyles} from "@popperjs/core";

@Component({
  selector: 'app-patientdeptorall',
  templateUrl: './patientdeptorall.component.html',
  styleUrls: ['./patientdeptorall.component.css']
})
export class PatientdeptorallComponent implements OnInit {
  stockSaleModelData:StockSaleModelData []=[];
  stockPaymentModelData:StockPaymentData []=[];
   stockSale:StockSaleModelData[]=[];
   stockPayment2:StockPaymentData[]=[];
   say:number=0;

  constructor(
    private stockSaleService:StocksaleService,
    private stockPaymentService:StockpaymentService
  ) { }

  ngOnInit(): void {

    this.patientInDebt()
  }



  patientInDebt(){
    const companyId=sessionStorage.getItem("companyId");
    let id: number | undefined =0;
    this.stockSaleService.getAllByPatientSaleCompanyId(companyId)?.subscribe(data=>{
      data?.data.forEach(f=>{
        if (this.entryIdAlreadyExists(this.stockSaleModelData, f)) {
          this.stockSaleModelData = this.updateWeightForEntryWithId (this.stockSaleModelData, f);
        } else {
          this.stockSaleModelData.push(f);
        }
      })
    })
    this.stockPaymentService.findAllPatientCompanyId(companyId)?.subscribe(data=>{
      data?.data.forEach(f=>{
        if (this.entryIdAlreadyExists(this.stockPaymentModelData, f)) {
          this.stockPaymentModelData = this.updatePayment(this.stockPaymentModelData, f);
        } else {
          this.stockPaymentModelData.push(f);
        }
      })
    })





  }

  public borcKontrol(data:StockSaleModelData){
    let stockPayment=this.stockPaymentModelData?.find(item2=>{return item2.patientDto?.id==data?.patientDto?.id})
    let result=Number(data?.salePrice)-Number(stockPayment?.paymentAmount);
    if (stockPayment==null){
      return data.salePrice;
    }
    return result;
  }

 public stocPaymentControl(data:StockSaleModelData){

    let status=false;
   // console.log(data)
     let stockPayment=this.stockPaymentModelData.find(item2=>{return item2.patientDto?.id==data?.patientDto?.id})
     if (Number(data?.salePrice)>Number(stockPayment?.paymentAmount ||stockPayment==null )){
       console.log("sale prince"+data.salePrice)
      return  status=true;
     }
     return status;
  }

  entryIdAlreadyExists(dataEntries:any[], entry:any) {
    for (let dataEntry of dataEntries) {
      if (entry.patientDto?.id === dataEntry.patientDto?.id) {
        return true;
      }
    }
    return false;
  }
  updatePayment (dataEntries:any[], entry:any) {
    for (let dataEntry of dataEntries) {
      if (entry.patientDto?.id === dataEntry.patientDto?.id) {
        dataEntry.paymentAmount = dataEntry.paymentAmount + entry.paymentAmount;
      }
    }
    return dataEntries;
  }

  updateWeightForEntryWithId (dataEntries:any[], entry:any) {
    for (let dataEntry of dataEntries) {
      if (entry.patientDto?.id === dataEntry.patientDto?.id) {
        dataEntry.salePrice = dataEntry.salePrice + entry.salePrice;
      }
    }
    return dataEntries;
  }





}
