import { Component, OnInit } from '@angular/core';
import {ToastService} from "../../../services/toast.service";
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {Messages} from "../../../utils/messages";
import {StockBrandModel} from "../../../models/StockBrandModel";
import {StockModelData, StockModelItem, StockModelModel} from "../../../models/StockModelModel";
import {StockbrandService} from "../../../services/stockbrand.service";
import {StockModelService} from "../../../services/stockmodel.service";
import {CompanyData} from "../../../models/CompanyModel";
import {StockService} from "../../../services/stock.service";
import {Sweetalert2Service} from "../../../services/sweetalert2.service";

@Component({
  selector: 'app-stockadd',
  templateUrl: './stockadd.component.html',
  styleUrls: ['./stockadd.component.css']
})
export class StockaddComponent implements OnInit {

  stockFormGroup!:UntypedFormGroup;
  stockBrandModel:StockBrandModel |undefined;
  stockModelModel!:StockModelModel;
  companyDto:CompanyData=new CompanyData();
  companyId=sessionStorage.getItem("companyId");


  constructor(
    private toast:ToastService,
    private formBuilder:UntypedFormBuilder,
    private message:Messages,
    private stockBrandService:StockbrandService,
    private stockModelService:StockModelService,
    private stockService:StockService,
    private sweetAlert:Sweetalert2Service
  ) { }

  ngOnInit(): void {

    this.stockForm();
    this.stockBrandGetAll();
    this.stockModelGetAll();

  }

 stockCounter(){
    return new Array(100);
}

stockForm(){
    this.stockFormGroup=this.formBuilder.group({
      serialNumber:['',[Validators.required]],
      stockAmount:['1',[Validators.required]],
      price:['',[Validators.required]],
      stockBrand:['1',[Validators.required]],
      stockModel:['',[Validators.required]]
    })
}


stockAdd(){

  this.companyDto.id=Number(this.companyId)
  if (this.stockFormGroup.invalid){
    this.sweetAlert.toastError(this.message.notNull)
    return;
  }

    const model={
      serialNumber:this.stockFormGroup.value.serialNumber,
      stockAmount:this.stockFormGroup.value.stockAmount,
      price:this.stockFormGroup.value.price,
      companyDto:this.companyDto,
      stockModelDto:this.stockModelModel.data.find(f=>{
       return  f.id==this.stockFormGroup.value.stockModel
      })

    }
  console.log(model.stockModelDto)
  this.stockService.save(model)?.subscribe(item=>{
    if (item.status){
      this.sweetAlert.saveMessage(item.message).then(res=>{
        console.log(res)
        if (this.sweetAlert.return){
          window.location.reload()
        }
      })
    }
    else {
      this.sweetAlert.toastError(item.message)
    }


  })



}


stockModelFilitreleme(){
   return  this.stockModelModel?.data.filter(f=>f.stockBrandDto?.id==this.stockFormGroup.value.stockBrand)
}


stockModelGetAll(){
    this.stockModelService.getAll()?.subscribe(item=>{
      this.stockModelModel=item
    })
}
stockBrandGetAll(){

  this.stockBrandService.stockBrandCompanyGetAll(this.companyId)?.subscribe(data=>{
    this.stockBrandModel=data;
  })
}

}
