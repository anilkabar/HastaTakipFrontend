import { DoctorService } from './../../services/Doctor.service';
import { Component, OnInit } from '@angular/core';
import { DoctorModel } from 'src/app/models/DoctorModel';
import {StocksaleService} from "../../services/stocksale.service";
import {StockpaymentService} from "../../services/stockpayment.service";
import {StockSaleItem, StockSaleModel, StockSaleModelData} from "../../models/StockSaleModel";
import {StockPaymentData, StockPaymentModel} from "../../models/StockPaymentModel";
import {PatientService} from "../../services/Patient.service";
import {PatientData, PatientModel} from "../../models/PatientModel";
import {Route, Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  doctorModel:DoctorModel | undefined
  companyId?:number;
  stockSale?:StockSaleModel;
  stockPayment?:StockPaymentModel;
  stockSaleModelData:StockSaleModelData []=[];
  stockPaymentModelData:StockPaymentData []=[];
  patientData!:PatientModel

  constructor(
    private doctorService:DoctorService,
    private stockSaleService:StocksaleService,
    private stockPaymentService:StockpaymentService,
    private patientService:PatientService,
    private route:Router,
  ) { }

  ngOnInit():void {
    this.patientInDebt();
    this.patientCount()
    //this.dene()


  }

  patientDeptrolAll(){
    this.route.navigate(['/Patient/PatientDebtAll/'])
  }

  patientCount(){
    // @ts-ignore
    const users=JSON.parse(sessionStorage.getItem("user"));
    const jsonuser=users['sub'];
     this.patientService.getAll(jsonuser)?.subscribe(data=>{
       this.patientData=data;
      }
    )
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

    console.log(this.stockSaleModelData)
    console.log(this.stockPaymentModelData)
  }


  patientInDebtCount(){
    let count=0;
    this.stockSaleModelData.forEach(item=>{
      //console.log(item)
      let stockPayment=this.stockPaymentModelData.find(item2=>{
        return item2.patientDto?.id==item.patientDto?.id;
      })
      if (Number(item.salePrice)>Number(stockPayment?.paymentAmount ||stockPayment==undefined)){
        count+=1;
      }

    })
    return count;
  }


   entryIdAlreadyExists(dataEntries:any[], entry:any) {
    for (let dataEntry of dataEntries) {
      if (entry.patientDto?.id === dataEntry.patientDto?.id) {
        return true;
      }
    }
    return false;
  }

   updateWeightForEntryWithId (dataEntries:any[], entry:any) {
    for (let dataEntry of dataEntries) {
      if (entry.patientDto?.id === dataEntry.patientDto?.id) {
        dataEntry.salePrice = dataEntry.salePrice + entry.salePrice;
      }
    }
    return dataEntries;
  }

  updatePayment (dataEntries:any[], entry:any) {
    for (let dataEntry of dataEntries) {
      if (entry.patientDto?.id === dataEntry.patientDto?.id) {
        dataEntry.paymentAmount = dataEntry.paymentAmount + entry.paymentAmount;
      }
    }
    return dataEntries;
  }



  /*
  dene(data:any){
    this.stockSale?.data.forEach(f=>{
      console.log(f)
      if (this.entryIdAlreadyExists(this.result2, f)) {
        this.result2 = this.updateWeightForEntryWithId (this.result2, f);
      } else {
        this.result2.push(f);
      }
    })

    console.log("denneme"+this.result2);

   */










}
