import { Component, OnInit } from '@angular/core';
import {PageadminService} from "../../../services/pageadmin.service";
import {PageAdminData, PageAdminModel} from "../../../models/PageAdminModel";
import {ActivatedRoute} from "@angular/router";
import {UserauthorityService} from "../../../services/userauthority.service";
import {UserAuthority, UserAuthorityData, UserAuthorityModel} from "../../../models/UserAuthorityModel";
import {FormArray, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {mode} from "crypto-ts";
import {Sweetalert2Service} from "../../../services/sweetalert2.service";
import {Messages} from "../../../utils/messages";

@Component({
  selector: 'app-userprivileges',
  templateUrl: './userprivileges.component.html',
  styleUrls: ['./userprivileges.component.css']
})
export class UserprivilegesComponent implements OnInit {

  pageAdminModel!:PageAdminModel;
  userId:any;
  userAuthorityModel!:UserAuthorityModel;
  userAuthoritys:UserAuthority[]=[];
  deneme:Array<UserAuthority>[]=[];
  selectedCategories: any[] = [];
  value: boolean=true;
  form!:FormGroup

  constructor(
    private pageAdminService:PageadminService,
    private activatedRoute:ActivatedRoute,
    private userAuthorityService:UserauthorityService,
    private formBuilder:FormBuilder,
    private sweetAlert:Sweetalert2Service,
    private message:Messages
  ) {

    this.form=this.formBuilder.group({
      fs:this.formBuilder.array([])

    })


  }



  ngOnInit(): void {
    this.pageAdminGetAll();
      this.activatedRoute.params.subscribe(params => {
        this.userId=params['userId']

      });
      this.getAllUserAuthorityByUserId()


    //console.log(this.form.controls['fs'].value)


  }





  getAllUserAuthorityByUserId(){
    return this.userAuthorityService.getAllUserAuthorityByUserId(parseInt(this.userId))?.subscribe(data=>{
      this.userAuthorityModel=data;
    })
  }

  save(){
    this.userAuthorityService.saveAndFlush(this.userAuthoritys)?.subscribe(data=>{
      if(data.status){
        this.getAllUserAuthorityByUserId()
        this.sweetAlert.toastSuccess(this.message.userAuthority)
        this.userAuthoritys=[];
        console.log(this.userAuthoritys)
      }
    })

  }



  pageAdminGetAll(){
    this.pageAdminService.getAll()?.subscribe(data=>{
      this.pageAdminModel=data;
    })
  }
  handleChange(event:any,value:any){

    const model :UserAuthority={
      pageAdminId:value,
      isActive:event.checked,
      userId:this.userId
    }
    console.log(this.userAuthoritys)

    if (this.userAuthoritys?.length==0){
      this.userAuthoritys?.push(model)
    }
    else{
      this.userAuthoritys?.forEach((f,index)=>{
        if(f.pageAdminId==value){
          this.userAuthoritys.splice(this.userAuthoritys.indexOf(f),1)
          return;
        }
      })
      this.userAuthoritys.push(model)
    }
  }

    userAuthority(id:any){
    let status=false
       for (let i of this.userAuthorityModel?.data){
         if (i.pageAdminId===id)
         {
           status=true;
           return status
         }
       }
      //console.log(dt)
      return status;
    }
}
