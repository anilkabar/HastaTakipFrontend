import { Component, OnInit } from '@angular/core';
import {AutGuard} from "../../../aut.guard";


@Component({
  selector: 'app-leftbar',
  templateUrl: './leftbar.component.html',
  styleUrls: ['./leftbar.component.css']
})
export class LeftbarComponent implements OnInit {

  hastalar:boolean=false
  role!:string[]

  constructor(
    public autGuard:AutGuard,
  ) { }



  ngOnInit() {

  }


  ustMenu(menuItem?:string,menuItem2?:string,menuItem3?:string):boolean{
    let status=false;
    const user=sessionStorage.getItem("user");
    if (user!=null){
      const jsonUser=JSON.parse(user);
      this.role=jsonUser["role"];
      for (let data of this.role){
        if (data==menuItem || data==menuItem2 ||menuItem3==data){
          return status=true;
        }
      }
      }
      return false;
  }



  menuPermission(menuItem:string):boolean{
    let status=false;
    const user=sessionStorage.getItem("user");
    if (user!=null){
      const jsonUser=JSON.parse(user);
      this.role=jsonUser["role"];
      for(let data of this.role){
        if (data==this.autGuard.patientAdd && this.autGuard.patientAdd_permission[0]==menuItem){
          status=true;
          return status;
        }
        if (data==this.autGuard.patientList && this.autGuard.patientList_permission[0]==menuItem){
          status=true;
          return status;
        }
        if (data==this.autGuard.stockAdd && this.autGuard.stockAdd_permission[0]==menuItem){
          status=true;
          return status;
        }
        if (data==this.autGuard.stockList && this.autGuard.stockList_permission[0]==menuItem){
          status=true;
          return status;
        }
        if (data==this.autGuard.meeting && this.autGuard.meeting_permission[0]==menuItem){
          status=true;
          return status;
        }

        //Cihazİşlemleri
        if (data==this.autGuard.deviceOperations && this.autGuard.deviceOperations_permission[0]==menuItem){
          status=true;
          return status;
        }
        if (data==this.autGuard.userOperations &&this.autGuard.userOperations_permission[0]==menuItem){
          status=true;
          return status;
        }

      }



    }
    return status;
  }


}
