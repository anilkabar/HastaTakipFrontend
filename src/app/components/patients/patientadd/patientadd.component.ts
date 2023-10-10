import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormArray, UntypedFormBuilder, FormControl, UntypedFormGroup, NgForm, Validators} from "@angular/forms";
import {PatientData, PatientModel} from "../../../models/PatientModel";
import {Enum} from "../../../enum/Enum";
import {Sweetalert2Service} from "../../../services/sweetalert2.service";
import {DoctorService} from "../../../services/Doctor.service";
import { DoctorModel} from "../../../models/DoctorModel";
import {CityModel} from "../../../models/CityModel";
import {CityService} from "../../../services/city.service";
import {CompanyData} from "../../../models/CompanyModel";
import {DistrictService} from "../../../services/district.service";
import {DistrictModel} from "../../../models/DistrictModel";
import {PatientService} from "../../../services/Patient.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Messages} from "../../../utils/messages";
import {ToastService} from "../../../services/toast.service";

@Component({
  selector: 'app-patientadd',
  templateUrl: './patientadd.component.html',
  styleUrls: ['./patientadd.component.css']
})
export class PatientaddComponent implements OnInit {
  form:File |undefined;
  doctorModel?: DoctorModel
  cityModel?: CityModel
  districtModel?: DistrictModel
  gender = Enum;
  doctorId?: any;
  company: CompanyData=new CompanyData();
  secilen?: any
  formGroup!:UntypedFormGroup;
  imageFile?:File;
  imageData?:FormData;
  companyId=sessionStorage.getItem("companyId")
  companyData:CompanyData=new CompanyData();


  constructor(
    private router:Router,
    private activeRouter:ActivatedRoute,
    private sweetAlert: Sweetalert2Service,
    private doctorService: DoctorService,
    private cityService: CityService,
    private districtService: DistrictService,
    private patientService: PatientService,
    private formBuilder:UntypedFormBuilder,
    private message:Messages,
    private toast:ToastService
  ) {
  }
  ngOnInit() {


    /*this.doctorService.getAll()?.subscribe(data => {
      this.doctorModel = data;
    })

     */
    this.doctorCompanyIdGetAll();
    this.patientForm()
    this.cityGetAll();


  }

  doctorCompanyIdGetAll(){
    this.doctorService.getAllCompanyId(this.companyId)?.subscribe(data=>{
      this.doctorModel=data;
    })
  }


  patientForm(){

    this.formGroup=this.formBuilder.group({


      identificationNumber:['',[Validators.required,Validators.maxLength(11)]],
      name:[null,[Validators.required]],
      surname:['',[Validators.required]],
      phone:['',[Validators.required,Validators.pattern(
        '(([+][(]?[0-9]{1,3}[)]?)|([(]?[0-9]{4}[)]?))\s*[)]?[-\s\.]?[(]?[0-9]{1,3}[)]?([-\s\.]?[0-9]{3})([-\s\.]?[0-9]{3,4})'
      ),Validators.maxLength(11)]],
      email:['',[Validators.required,Validators.email]],
      dateofBirth:['',[Validators.required]],
      gender:['',[Validators.required]],
      doctor:['',[Validators.required]] ,
      district:['',[Validators.required]],
      address:['',[Validators.required]],
      imagePath:['',[]],
      city:['',[Validators.required]],

      /*
      identificationNumber:['',],
      name:['',[]],
      surname:[''],
      phone:[''],
      email:[''],
      dateofBirth:[''],
      gender:[''],
      doctor:[''] ,
      district:[''],
      address:[''],
      imagePath:[''],
      city:[''],

       */
    })
  }
  patientAdd() {

    this.company.id=Number(this.companyId)

    if (this.formGroup.invalid){
      this.patientNotNullControl()
      return;
    }
    const model = {
      identificationNumber: this.formGroup.value.identificationNumber,
      name: this.formGroup.value.name,
      surname: this.formGroup.value.surname,
      dateofBirth: this.formGroup.value.dateofBirth,
      phone: this.formGroup.value.phone,
      email: this.formGroup.value.email,
      adress: this.formGroup.value.adress,
      imagePath: this.imageFile?.name,
      gender: this.formGroup.value.gender,
      company: this.company,
      district:this.districtModel?.data.find(f=>{
        return f.id==this.formGroup.value.district
      }),
      doctor: this.doctorModel?.data?.find(f => {
        return f.id == this.formGroup.value.doctor
      })
    }

    this.patientService.save(model,this.imageFile)?.subscribe(item => {
      if (item.status) {
        //this.pageClear()
        this.sweetAlert.saveMessage(item.message).then(res=>{
          console.log(res)
          if (this.sweetAlert.return){
            window.location.reload();
          }
        })
      }
      else{
        this.sweetAlert.toastError(item.message)
      }
    })
  }

  cityGetAll() {
    this.cityService.getAll()?.subscribe(data => {
      this.cityModel = data;
    })
  }


  districtGetAll() {
    if (this.formGroup.value.city==0){
      this.formGroup.controls['city'].reset();
      //this.formGroup.setControl('city',this.formBuilder.control('',[Validators.required]))
    }
    if (this.formGroup.value.city>0 && this.formGroup.value.city!='Seçiniz') {
      this.districtService.getAllCityId(this.formGroup.value.city)?.subscribe(data => {
        this.districtModel = data;
      })
    }
  }


  pageClear(){
    this.formGroup.reset();
  }

  selectimagePath(event:any){
    this.imageFile = event.target.files[0]
  }


patientNotNullControl(){
    let formArray=[
      {key:'identificationNumber',message:'Tc Kimlik'},
      {key:'name',message: 'Adı'},
      {key:'surname',message: 'Soyadı'},
      {key:'phone',message: 'Telefon'},
      {key:'email',message: 'E-Posta'},
      {key:'dateofBirth',message: 'Doğum Tarihi'},
      {key:'gender',message: 'Cinsiyet'},
      {key:'doctor',message: 'Doktor'},
      {key:'district',message: 'İlçesi'},
      {key:'address',message: 'Adresi'},
      {key:'imagePath',message: 'Fotoğraf'},
      {key:'city',message: 'İl'}
    ];
    formArray.forEach(f=>{
      if (this.formGroup.controls[f.key].invalid){
        this.toast.toastError(f.message+" Boş geçilemez veya Formatına Uygun Olmalıdır")
      }
    })
  }


}
