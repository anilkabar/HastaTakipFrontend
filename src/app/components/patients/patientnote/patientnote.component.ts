import {Component, Input, OnInit} from '@angular/core';
import {PatientNoteService} from "../../../services/PatientNote.service";
import {ActivatedRoute} from "@angular/router";
import {ToastService} from "../../../services/toast.service";
import { PatientNoteItem, PatientNoteModel} from "../../../models/PatientNoteModel";
import {PatientData} from "../../../models/PatientModel";
import {Sweetalert2Service} from "../../../services/sweetalert2.service";
import {BaseService} from "../../../services/Base.service";
import {Messages} from "../../../utils/messages";


@Component({
  selector: 'app-patientnote',
  templateUrl: './patientnote.component.html',
  styleUrls: ['./patientnote.component.css'],
  providers:[PatientNoteService]
})
export class PatientnoteComponent implements OnInit {

  patientNoteModel:PatientNoteModel |undefined;
  patientNoteItem:PatientNoteItem |undefined;
  content:string="";
  @Input() patientData:PatientData |undefined;

  constructor(
    private patientNoteService:PatientNoteService,
    private activatedRoute:ActivatedRoute,
    private toast:ToastService,
    private sweetAlert:Sweetalert2Service,
    private message:Messages

  ) { }

  ngOnInit(): void {
    this.getAllPatientNotePatientId()
  }
  getAllPatientNotePatientId(){
    this.patientNoteService.getAllPatientNotePatientId(this.patientData?.id)?.subscribe(item=>{
      this.patientNoteModel=item

    })
  }


  patientNoteSave(){
    console.log(this.message.notNull);

    if (this.content==""){
      this.sweetAlert.toastError(this.message.notNull)
      return;
    }
    if (this.content.length<0){
      this.sweetAlert.toastError(this.message.maxCharacters)
      return;
    }
    const savePatientNote={
      content:this.content,
      patientDto:this.patientData
    }
    this.patientNoteService.save(savePatientNote)?.subscribe(item=>{
      console.log(item.status)
      if (item.status){
        this.getAllPatientNotePatientId()
        this.sweetAlert.toastSuccess(item.message)
        this.content="";
      }
      else {
        this.toast.toastError(item.message)
      }
    })
  }
  patientNoteDelete(id:any){
    //then bu void in yani sweetdeletenin tamamı çalıştıktan sonra ne yapmak istediğini yazmak için kullanılır
    this.sweetAlert.sweetDelete().then(res=>{
      if (this.sweetAlert.sweetdel){
        this.patientNoteService.deleteById(id)?.subscribe(item=>{
          this.getAllPatientNotePatientId()
        })
      }
    }).catch(err=>{
      this.sweetAlert.toastError(this.message.deleteError)
      console.log('hata')
    })

  }

}
