import { PatientNoteService } from './../../../services/PatientNote.service';
import { PatientNoteModel} from './../../../models/PatientNoteModel';
import { PatientItem } from './../../../models/PatientModel';
import { PatientService } from './../../../services/Patient.service';
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {ToastService} from "../../../services/toast.service";
import {BaseService} from "../../../services/Base.service";
import {EncryptionService} from "../../../services/encryption.service";

@Component({
  selector: 'app-patientdetail',
  templateUrl: './patientdetail.component.html',
  styleUrls: ['./patientdetail.component.css'],
  providers:[PatientService]
})
export class PatientdetailComponent implements OnInit {

  patient:PatientItem |undefined ;
  patientNote:PatientNoteModel |undefined;
  content:string |undefined;
  patientId:number |undefined;
  noteClickValue:boolean=false;
  documentClickValue:boolean=false;
  examinationClickValue:boolean=false;
  cinsiyet:any |undefined;

  retrievedImage:any;
  base64Data:any;
  imageName:any=[];
  image2?:any;


  constructor(private patientService:PatientService,
              private patientNoteservice:PatientNoteService,
    private activatedRoute:ActivatedRoute,
              private toast:ToastService,
              private base:BaseService,
              public encryptDecrypt:EncryptionService,

    ) { }

  ngOnInit() {
    this.patientSelected();

  }

  examinationClick(value:boolean){
    if (value){
      this.examinationClickValue=true;
    }

  }


  noteClick(value:boolean){
    if (value){
      this.noteClickValue=true;
    }
  }
  documentClick(value:boolean){
    if (value){
      this.documentClickValue=true;
    }
  }


  patientData(){
    return this.patient?.data;
  }


  patientNoteSave(){
    const addPatientNote={
      content:this.content,
      patientDto:this.patient?.data
    }
    console.log(this.content)
    if (this.content=="")
    {
      this.toast.toastError("Lütfen Tüm Alanları Doldurun")
    }
    else{
      this.patientNoteservice.save(addPatientNote)?.subscribe(data=>{
        console.log(data)
      })
      console.log(this.patientNote?.data)
      this.patientSelected();
      this.patientSelected();
      this.toast.toastSucccess("Çok Başarılı")
    }


  }



  patientSelected(){
    this.activatedRoute.params.subscribe(params=>{
      //let id=this.encryptDecrypt.decryption(params["patientId"]).toString();
      this.patientService.getById(parseInt(params["patientId"]))?.subscribe(data=>{
        this.patient=data;
        this.patientId=data.data.id
        this.cinsiyet=data.data.gender

      })
    })

  }


}
