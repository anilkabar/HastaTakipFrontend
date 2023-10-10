import { Component, OnInit } from '@angular/core';
import {UsersService} from "../../../services/users.service";
import {UserModel, UserModelData} from "../../../models/UserModel";
import {AutGuard} from "../../../aut.guard";
import {Router} from "@angular/router";

@Component({
  selector: 'app-useroperations',
  templateUrl: './useroperations.component.html',
  styleUrls: ['./useroperations.component.css']
})
export class UseroperationsComponent implements OnInit {

  companyId=sessionStorage.getItem("companyId")
  userModel!:UserModel
  userModelData?:UserModelData
  checked!:boolean[];
  userId!:any

  constructor(
    private userService:UsersService,
    private aut:AutGuard,
    private route:Router,

  ) { }

  ngOnInit(): void {
    this.userCompanyIdGetAll();
    this.userId=this.aut.userId()
  }

  userCompanyIdGetAll(){
    this.userService.userCompanyIdGetAll(this.companyId)?.subscribe(data=>{
      this.userModel=data;
    })
  }
  handleChange(e:any,id:any) {
    const model:UserModelData={
      id:id,
      isActive:e.checked
    }
    this.userService.update(model)?.subscribe(data=>{
      if (data.status){
        this.userCompanyIdGetAll();
      }
    })
  }

  userDetail(id:any){
    this.route.navigate(['/Settings/UserPrivileges/'+id])
  }

}
