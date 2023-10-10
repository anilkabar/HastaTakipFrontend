import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {PatientData} from "../../../models/PatientModel";
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {PatientdocumentService} from "../../../services/patientdocument.service";
import {Sweetalert2Service} from "../../../services/sweetalert2.service";
import {Messages} from "../../../utils/messages";
import { PatientDocumentModel} from "../../../models/PatientDocumentModel";
import {Base64Extension} from "../../../utils/base64-extension";




// noinspection JSPotentiallyInvalidConstructorUsage
@Component({
  selector: 'app-patientdocument',
  templateUrl: './patientdocument.component.html',
  styleUrls: ['./patientdocument.component.css']
})
export class PatientdocumentComponent implements OnInit {


  @Input() patientData:PatientData |undefined;
  @Input() patientId?:number;
  formDocument!:UntypedFormGroup;
  patientDocumentModel:PatientDocumentModel |undefined;
  documentFile:File |undefined;
  documentPathURl:any;
  base= new Base64Extension

  constructor(
    private formBuilder:UntypedFormBuilder,
    private patientDocumentService:PatientdocumentService,
    private sweetAlert:Sweetalert2Service,
    private message:Messages,
  ) { }

  ngOnInit(): void {
    this.patientDocumentForm()
    this.getAllPatientDocumentPatientId();
  }

  pdfView(id:any){
     this.documentPathURl=this.patientDocumentModel?.data?.find(f=>{
     return f.id==id
    })
    console.log(this.documentPathURl)
    console.log(this.base.getBase64Extension(this.documentPathURl?.path))


    /*
    console.log(btoa(this.documentPathURl?.path))
    console.log(atob(this.documentPathURl?.path))
    /*
    const source = this.documentPathURl?.path
    const link = document.createElement("a");
    link.href = source;
    link.download = `${this.documentPathURl.name}.jpeg`
    link.click();s

     */
  }





  getAllPatientDocumentPatientId(){
    console.log(this.patientId)
    this.patientDocumentService.getAllPatientDocumentPatientId(this.patientData?.id)?.subscribe(item=>{
      this.patientDocumentModel=item;
    })
  }


  patientDocumentForm(){
    this.formDocument=this.formBuilder.group({
      documentName:['',[Validators.required]],
      documentPath:['',[Validators.required]]
    })
  }

  patientDocumentDelete(id:any){

    this.sweetAlert.sweetDelete().then(res=>{
      if (this.sweetAlert.sweetdel){
        this.patientDocumentService.deleteById(id)?.subscribe(item=>{
          if (item.status==true){
            this.getAllPatientDocumentPatientId();
          }
        })

      }
    }).catch(err=>{
      this.sweetAlert.toastError(this.message.deleteError)
    })


  }

  patientDocumentSave(){

    if (this.formDocument.invalid){
      this.sweetAlert.toastError(this.message.notNull)
      return;
    }


    const model={
      name:this.formDocument.value.documentName,
      path:this.formDocument.value.documentPath,
      patientDto:this.patientData
    }
    this.patientDocumentService.save(model,this.documentFile)?.subscribe(item=>{
      if (item.status==true){
        this.formDocument.reset();
        this.sweetAlert.toastSuccess(this.message.saveSuccess)
        this.getAllPatientDocumentPatientId();
        return;
      }
      if (item.status==false){
        this.sweetAlert.toastError(item.message);
      }
      else{
        this.sweetAlert.toastError(this.message.error)
      }
    })
  }

  selectDocument(event:any){
    this.documentFile=event.target.files[0];
  }

}
