import { Component, OnInit } from '@angular/core';
import {StockbrandService} from "../../../services/stockbrand.service";
import {StockBrandData, StockBrandModel} from "../../../models/StockBrandModel";
import {Form, UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {ToastService} from "../../../services/toast.service";
import {Messages} from "../../../utils/messages";
import {CompanyData} from "../../../models/CompanyModel";
import {Sweetalert2Service} from "../../../services/sweetalert2.service";
import {StockModelService} from "../../../services/stockmodel.service";
import {StockModelModel} from "../../../models/StockModelModel";

@Component({
  selector: 'app-deviceoperations',
  templateUrl: './deviceoperations.component.html',
  styleUrls: ['./deviceoperations.component.css']
})
export class DeviceoperationsComponent implements OnInit {

  stockBrandModel?:StockBrandModel
  stockBrandFormGroup!:UntypedFormGroup
  stockModelFormGroup!:UntypedFormGroup
  company?:CompanyData |undefined
  stockModel:StockModelModel |undefined;
  isActive?:any;
  constructor(
    private stockBrandService:StockbrandService,
    private formBuilder:UntypedFormBuilder,
    private toast:ToastService,
    private sweetAlert:Sweetalert2Service,
    private message:Messages,
    private stockModelService:StockModelService

  ) { }

  ngOnInit(): void {
    this.stockBrandGetAll();
    this.stockBrandForm();
    this.stockModelGetAll();
    this.stockModelForm();
  }

  stockBrandForm(){
    this.stockBrandFormGroup=this.formBuilder.group({
      name:['',[Validators.required]],
    })
  }

  find(){

  }



  stockBrandSave($event:any){

    this.isActive=false;
    this.stockBrandModel?.data?.find(f=>{
      if (f.name?.toLowerCase()==this.stockBrandFormGroup.value.name.toLowerCase()){
        this.isActive=true
      }
    })
    if (this.isActive){
      this.sweetAlert.toastError("Cihaz İsmi Kayıtlı Lütfen Farklı Bir İsim Girerek Tekrar Deneyiniz ")
      return;
    }

    const model={
      name:this.stockBrandFormGroup.value.name,
      company:this.company
    }

    if (this.stockBrandFormGroup?.invalid){
      this.sweetAlert.toastError(this.message.notNull)
      return;
    }
    else {
      this.stockBrandService.save(model)?.subscribe(item=>{
        this.stockBrandFormGroup.reset();
        $event.click();
        this.stockBrandGetAll()
        this.sweetAlert.toastSuccess(item.message)
      })

    }

  }
  stockBrandGetAll(){
    this.stockBrandService.getAll()?.subscribe(item=>{
      this.stockBrandModel=item;
    });
  }



  stockModelForm(){
    this.stockModelFormGroup=this.formBuilder.group({
      name:['',[Validators.required]],
      stockBrand:['',[Validators.required]]
    })
  }


  stockModelSave($event:any){
    this.isActive=false;
    this.stockModel?.data?.find(f=>{
      if (f.name?.toLowerCase()==this.stockModelFormGroup.value.name.toLowerCase()){
        this.isActive=true
      }
    })
    if (this.isActive){
      this.sweetAlert.toastError("Cihaz Model İsmi Kayıtlı Lütfen Farklı Bir İsim Girerek Tekrar Deneyiniz ")
      return;
    }

    const model={
      name:this.stockModelFormGroup.value.name,
      stockBrandDto:this.stockBrandModel?.data.find(f=>{
        return f.id==this.stockModelFormGroup.value.stockBrand
      })
    }
    if (this.stockModelFormGroup.invalid){
      this.sweetAlert.toastError(this.message.notNull)
      return;
    }
    else {
      this.stockModelService.save(model)?.subscribe(item=>{
        this.stockModelFormGroup.reset();
        $event.click();
        this.stockModelGetAll();
        this.sweetAlert.toastSuccess(item.message)
      })
    }

  }

  stockModelDelete(id:any){
    this.sweetAlert.sweetDelete().then(res=>{
      if (this.sweetAlert.sweetdel){
        this.stockModelService.deleteById(id)?.subscribe(item=>{
          if (item.status){
            this.stockModelGetAll()
          }
        })
      }
    })
  }


  stockModelGetAll(){
    this.stockModelService.getAll()?.subscribe(item=>{
      this.stockModel=item;
    })
  }



}
