import {Component, Injectable, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PatientService} from "../../../services/Patient.service";
import {PatientItem} from "../../../models/PatientModel";
import {StocksaleService} from "../../../services/stocksale.service";
import {StockSaleModel} from "../../../models/StockSaleModel";
import {Sweetalert2Service} from "../../../services/sweetalert2.service";
import {Messages} from "../../../utils/messages";
import {AdddevicesaleComponent} from "./adddevicesale/adddevicesale.component";
import {StockpaymentService} from "../../../services/stockpayment.service";
import {StockPaymentData, StockPaymentModel} from "../../../models/StockPaymentModel";
import {Enum, PaymentType} from "../../../enum/Enum";
import {retry} from "rxjs";
import {DatePipe, formatDate} from "@angular/common";
import {StockModelData, StockModelModel} from "../../../models/StockModelModel";

@Component({
  selector: 'app-patientdebt',
  templateUrl: './patientdebt.component.html',
  styleUrls: ['./patientdebt.component.css']
})
export class PatientdebtComponent implements OnInit {

  patientId:any |undefined;
  patient:PatientItem |undefined ;
  stockSaleModel:StockSaleModel |undefined;
  stockPaymentModel:StockPaymentModel |undefined;
  filterStockPaymentModel:StockModelData[] |undefined;
  total:number |undefined;
  paymentAmount?:number;
  paymentType=PaymentType;
  firstDate?:Date;
  lastDate?:Date;
  filterResult:boolean= false;

  constructor(
    private activatedRoute:ActivatedRoute,
    private patientService:PatientService,
    private stockSaleService:StocksaleService,
    private sweetalert:Sweetalert2Service,
    private message:Messages,
    private stockPaymentService:StockpaymentService,
    public dates:DatePipe
    //private datePipe:DatePipe


  ) {

  }

  ngOnInit(): void {
    this.patientSelected();
    this.getAllStockSaleByPatientId();
    this.getAllStockPaymentPatientId();


  }

  remainder(){
    let result=Number(this.total)-Number(this.paymentAmount);
    return result;

  }
  /*
  set firstDate(value:Date){
    this._firstDate=value;
    this.filterStockPaymentModel=this.filter();
  }
  get firstDate(){
    // @ts-ignore
    return this._firstDate;
  }
  set lastDate(value:Date){
    this._lastDate=value;
    this.filterStockPaymentModel=this.filter();
  }
  get lastDate(){
    // @ts-ignore
    return this._lastDate

  }
*/


  filter(){
    this.filterResult=true;
    this.filterStockPaymentModel=this.stockPaymentModel?.data;
    if (this.firstDate && this.lastDate){
      this.filterStockPaymentModel=this.filterStockPaymentModel?.filter(f=>{
        let date= this.dates?.transform(f.date,'yyyy-MM-dd')
        // @ts-ignore
        return date>=this.firstDate &&date<=this.lastDate
      })

    }
    return this.filterStockPaymentModel;
  }
  filterClean(){
    this.filterStockPaymentModel=this.stockPaymentModel?.data;
    this.filterResult=false;

  }



  patientSelected(){
    this.activatedRoute.params.subscribe(params=>{
      this.patientId=params["patientId"]
      this.patientService.getById(params["patientId"])?.subscribe(data=>{
        this.patient=data;
      })
    })
  }


  getAllStockPaymentPatientId(){
    let totalPaymentAmount = 0;
    this.stockPaymentService.findAllByPatientId(this.patientId)?.subscribe(data=>{
      this.stockPaymentModel=data;
      this.filterStockPaymentModel=data.data;
      data.data.forEach(data=>{
        const number=Number(data?.paymentAmount);
        totalPaymentAmount+=number;

      })
      this.paymentAmount=totalPaymentAmount;
    })
  }

  getAllStockSaleByPatientId(){
    var total=0;
    this.stockSaleService.getAllByPatientId(this.patientId)?.subscribe(data=>{
      this.stockSaleModel=data;
      data.data.forEach(data=>{
        var number=Number(data?.salePrice);
        total+=number
      })
      this.total=total;
    })
  }

  deletePayment(id:any){

    this.sweetalert.sweetDelete().then(res=>{
      if (this.sweetalert.sweetdel){
        this.stockPaymentService.deleteById(id)?.subscribe(data=>{
          if (data.status){
            this.ngOnInit();
          }
        })
      }
    })




  }

  deleteById(id:any){
    this.sweetalert.sweetDelete().then(res=>{
      if (this.sweetalert.sweetdel){
        this.stockSaleService.deleteById(id)?.subscribe(data=>{
          if (data.status==true){
            this.getAllStockSaleByPatientId();
            window.location.reload();

          }
        })
      }



    }).catch(err=>{
      this.sweetalert.toastError(this.message.deleteError)
    })
  }


  get currency(){
    return 140421414.15;
  }


}
