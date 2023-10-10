import {Component, Input, OnInit} from '@angular/core';
import {PatientData} from "../../../../models/PatientModel";
import {PatientdebtComponent} from "../patientdebt.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {PaymentType} from "../../../../enum/Enum";
import {StockpaymentService} from "../../../../services/stockpayment.service";
import {StockPaymentData} from "../../../../models/StockPaymentModel";
import {Sweetalert2Service} from "../../../../services/sweetalert2.service";
import {Messages} from "../../../../utils/messages";

@Component({
  selector: 'app-paymentadd',
  templateUrl: './paymentadd.component.html',
  styleUrls: ['./paymentadd.component.css']
})
export class PaymentaddComponent implements OnInit {

  closeResult="";
  paymentAddFormGroup!:UntypedFormGroup
  paymentType=PaymentType
  formGroup!:UntypedFormGroup;
  @Input() patientData?:PatientData;
  @Input() remainder?:number;
  constructor(
    private modalService:NgbModal,
    private stockPaymentService:StockpaymentService,
    private sweetalert:Sweetalert2Service,
    private message:Messages,
    private formBuilder:UntypedFormBuilder,
    private patientDbt:PatientdebtComponent
    //private formGroup2:FormGroup,
  ) { }


  ngOnInit(): void {
    this.paymentFormGroup();

  }
  paymentFormGroup(){
    this.formGroup=this.formBuilder.group({
      date:['',Validators.required],
      paymentType:['',Validators.required],
      paymentAmount:['',Validators.required],
      information:['',Validators.required]
    })
  }




  save(){
    const model:StockPaymentData={
      date:this.formGroup.value.date,
      paymentType:this.formGroup.value.paymentType,
      paymentAmount:this.formGroup.value.paymentAmount,
      information:this.formGroup.value.information,
      patientDto:this.patientData,
    }
    if (this.formGroup.invalid){
      this.sweetalert.toastError(this.message.notNull)
      return;
    }
    if (this.formGroup.value.paymentAmount>Number(this.remainder)){
      this.sweetalert.toastError("Tutar Alacaktan Büyük Olamaz");
      return;
    }

    this.stockPaymentService.save(model)?.subscribe(data=>{
      if (data.status==true){
        this.modalService.dismissAll();
        this.formGroup.reset();
        this.sweetalert.toastSuccess(this.message.saveSuccess)
        this.patientDbt.getAllStockPaymentPatientId();
        this.patientDbt.getAllStockSaleByPatientId();
        return;
      }
      this.sweetalert.toastError(this.message.error)
    })
  }



  modalOpen(content:any){
    this.modalService.open(content,{ariaLabelledBy:'modal-basic-title'}).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      },
    );

  }


  private getDismissReason(reason: any) {

  }
}
