import {Component, ElementRef, Injectable, Input, OnInit, ViewChild} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {StockService} from "../../../../services/stock.service";
import { StockModelModel} from "../../../../models/StockModelModel";
import {StockData, StockModel} from "../../../../models/StockModel";
import {StockSaleModel, StockSaleModelData} from "../../../../models/StockSaleModel";
import {PatientData} from "../../../../models/PatientModel";

import {StocksaleService} from "../../../../services/stocksale.service";
import {Sweetalert2Service} from "../../../../services/sweetalert2.service";
import {Messages} from "../../../../utils/messages";
import {PatientdebtComponent} from "../patientdebt.component";

@Component({
  selector: 'app-adddevicesale',
  templateUrl: './adddevicesale.component.html',
  styleUrls: ['./adddevicesale.component.css']
})
export class AdddevicesaleComponent implements OnInit {


  formGroup!:UntypedFormGroup
  stockModel:StockModel |undefined;
  stockData:StockData |undefined;
  stockSale:StockSaleModel |undefined;
  stockSaleModelData:StockSaleModelData |undefined;
  stockModelModel:StockModelModel |undefined;
  @Input() patientData:PatientData |undefined
  companyId=sessionStorage.getItem("companyId")

  constructor(
    private modalService:NgbModal,
    private formBuilder:UntypedFormBuilder,
    private stockService:StockService,
    private stockSaleService:StocksaleService,
    private sweatAlert:Sweetalert2Service,
    private message:Messages,
    private patie:PatientdebtComponent
  ) { }

  ngOnInit(): void {
    this.stockGetAll();
    this.addDeviceFormGroup();

  }

  addDeviceFormGroup(){
    this.formGroup=this.formBuilder.group({
      date:['',[Validators.required,]],
      stockModel:['',[Validators.required,Validators.min(1)]],
      salePrice:['',[Validators.required]],
      explanation:['',Validators.required]

    })
  }

  amount(){
    this.stockData=this.stockModel?.data.find(f=>{
      return f.id==this.formGroup.value.stockModel
    })

  }

  addDeviceSale(){
    console.log(this.formGroup.value.salePrice);
    const model:StockSaleModelData={
      date:this.formGroup.value.date,
      salePrice:this.formGroup.value.salePrice,
      buyPrice:this.stockData?.price,
      stockDto:this.stockModel?.data.find(f=>{
        return f.id==this.formGroup.value.stockModel
      }),
      patientDto:this.patientData,
      information:this.formGroup.value.explanation,
    }
    if (this.stockData?.stockAmount==0){
      this.sweatAlert.toastError("Stok Olmadığı İçin Satış Yapılamaz")
      return;
    }
    if (this.formGroup.invalid){
      this.sweatAlert.toastError(this.message.notNull);
      return;
    }

    this.stockSaleService.save(model)?.subscribe(data=>{
      if (data.status){
        this.patie.getAllStockSaleByPatientId();
        this.stockGetAll();
        this.modalService.dismissAll();
        this.sweatAlert.toastSuccess(this.message.saveSuccess)
        this.formGroup.reset();
      }
    })
  }

  stockGetAll(){
    this.stockService.stockGetAllCompanyId(this.companyId)?.subscribe(data=>{
      this.stockModel=data

    });
  }

  modalOpen(content:any){
    this.modalService.open(content,{ariaLabelledBy:'modal-basic-title'})
    //this.stockGetAll();
    this.amount();
  }

}
