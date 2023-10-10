import { Component, OnInit } from '@angular/core';
import {LoginService} from "../../services/login.service";
import {Router} from "@angular/router";
import {ToastService} from "../../services/toast.service";
import {CompanyId} from "../../models/CompanyModel";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  username:string="";
  password:string="";
  companyId:CompanyId |undefined;

  constructor(
   private loginService:LoginService,
   private route:Router,
   private toast:ToastService
  ) { }

  ngOnInit(): void {
  }

  login(){
    const data={
      "username":this.username,
      "password":this.password
    }
    this.loginService.login(data)?.subscribe(data=>{
      if (data["durum"]==false){
        this.toast.toastError("Giriş Yetkiniz İptal Edilmiş.")
      }
      if (data["token"]){
        const token=data["token"];
        const companyId=data["companyId"];
        const arr=token.split(".");
        const st=atob(arr[1]);
        sessionStorage.setItem("token",token);
        sessionStorage.setItem("user",st);
        sessionStorage.setItem("companyId",companyId)
        this.route.navigate(["Home"])

      }
    })
  }

}
