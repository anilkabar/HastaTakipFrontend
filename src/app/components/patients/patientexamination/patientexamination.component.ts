import {Component, Input, OnInit} from '@angular/core';
import {PatientData} from "../../../models/PatientModel";
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {Sweetalert2Service} from "../../../services/sweetalert2.service";
import {PatientexaminationService} from "../../../services/patientexamination.service";
import {PatientExaminationData, PatientExaminationModel} from "../../../models/PatientExaminationModel";
import {Messages} from "../../../utils/messages";

@Component({
  selector: 'app-patientexamination',
  templateUrl: './patientexamination.component.html',
  styleUrls: ['./patientexamination.component.css']
})
export class PatientexaminationComponent implements OnInit {

  @Input() patientData: PatientData | undefined;
  formExamination!: UntypedFormGroup;
  patientExaminationModel:PatientExaminationModel |undefined;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private sweetalert: Sweetalert2Service,
    private patientexaminationService: PatientexaminationService,
    private message:Messages
  ) {
  }

  ngOnInit(): void {
    this.formExaminationGroup();
    this.getAllByPatientExaminationPatientId();
  }

  formExaminationGroup() {
    this.formExamination = this.formBuilder.group({
      doctorDiagnosis: ['', [Validators.required],Validators.maxLength(255)],
      patientComplaint: ['', [Validators.required],Validators.maxLength(10)],
      treatmentAdministered: ['', [Validators.required]]

    })
  }


  save() {
    if (this.formExamination.value.doctorDiagnosis.length>254){
      this.sweetalert.toastError(this.message.error)
      return;
    }

    if (this.formExamination.invalid){
      this.sweetalert.toastError(this.message.notNull)
      return;
    }

    const model: PatientExaminationData = {
      doctorDiagnosis: this.formExamination.value.doctorDiagnosis,
      patientComplaint: this.formExamination.value.patientComplaint,
      treatmentAdministered: this.formExamination.value.treatmentAdministered,
      patientDto: this.patientData
    }
    this.patientexaminationService.save(model)?.subscribe(item => {
      if (item.status) {
        this.sweetalert.toastSuccess(item.message)
        this.formExamination.reset();
        this.getAllByPatientExaminationPatientId();
      } else {
        this.sweetalert.toastError(item.message)
      }
    })
  }

  getAllByPatientExaminationPatientId(){
    this.patientexaminationService.getAllByPatientExaminationPatientId(this.patientData?.id)?.subscribe(item=>{
      if(item.status==true){
        this.patientExaminationModel=item;
      }

    })
  }

  deleteById(id:number |undefined){

    this.sweetalert.sweetDelete().then(res=>{
      if (this.sweetalert.sweetdel){
        this.patientexaminationService.deleteById(id)?.subscribe(item=>{
          if (item.status==true){
            this.getAllByPatientExaminationPatientId();
          }
        })
      }
    }).catch(err=>{
      this.sweetalert.toastError(this.message.deleteError)
    })


  }


}
