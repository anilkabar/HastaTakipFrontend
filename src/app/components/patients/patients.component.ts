import { PatientService } from './../../services/Patient.service';
import {PatientData, PatientItem, PatientModel} from './../../models/PatientModel';
import { Component, OnInit } from '@angular/core';
import { PatientdetailComponent } from './patientdetail/patientdetail.component';
import {filter, Observable, timer} from "rxjs";
import {EncryptionService} from "../../services/encryption.service";

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css'],
  providers:[PatientdetailComponent]
})
export class PatientsComponent implements OnInit {

  patientModel?:PatientModel
  say?:number;
  size:any
  perPage=9;
  selectedPage=1;
  filterText?:any;



  constructor(
    private patientService:PatientService,
    public encryptDecrypt:EncryptionService,

  )
  { }

  ngOnInit():void {
    this.patientGetAll()

  }


  patientGetAll(){
    // @ts-ignore
    const users=JSON.parse(sessionStorage.getItem("user"));
    const jsonuser=users['sub'];
    return this.patientService.getAll(jsonuser)?.subscribe(data=>
      this.patientModel=data
      )
  }
  patientFilter(){
    return this.patientModel?.data?.filter(f=>
      f.identificationNumber.indexOf(this.filterText)!=-1 || f.name.toLowerCase().indexOf(this.filterText.toLowerCase())!=-1 ||
      f.surname.toLowerCase().indexOf(this.filterText.toLowerCase())!=-1 || f.phone?.indexOf(this.filterText)!=-1
    )
  }

 get pageNumber():number[]{
    this.size=this.patientModel?.data.length;
   this.size=this.size? this.size:20
   if (this.filterText){
     this.size=this.patientFilter()?.length
   }
   return  Array(Math.ceil(this.size/this.perPage))
      .fill(0)
      .map((a,i)=>i+1)

  }

   get patientAll():any{
     let start=(this.selectedPage-1)*this.perPage;
     if (this.filterText){
       return this.patientFilter()?.slice(start,start+this.perPage)
     }
    return this.patientModel?.data.slice(start,start+this.perPage)
  }




  changePage(p:number){
    this.selectedPage=p;
  }
  sifrele(id:any){
    return this.encryptDecrypt.encryption(id.toString());
  }




}
