import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn:'root'
})

export class AutGuard implements CanActivate{
  constructor(
    private router:Router
  ) {
  }

  patientAdd_permission=['/Patients/PatientAdd'];
  patientList_permission=['/Patients'];
  patientDetail_permission=['/Patient/PatientDetail/'];
  patientDebt_permission=['/Patient/PatientDebt/'];
  meeting_permission=['/Meeting'];
  stockAdd_permission=['/Stock/StockAdd'];
  stockList_permission=['/Stock/StockList'];
  patientReport_permission=[""];
  profitReport_permission=[""];
  userOperations_permission=["/Settings/UserOperations"];
  doctorOperations_permission=[""];
  deviceOperations_permission=['/Settings/DeviceOperations'];


  patientAdd="PatientAdd";
  patientList="Patients";
  stockAdd="StockAdd";
  stockList="StockList";
  meeting="Meeting";
  patientReport="PatientReport";
  profitReport="ProfitReport";
  userOperations="UserOperations";
  doctorOperations="DoctorOperations";
  deviceOperations="DeviceOperations";

  role!:string[]


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const user=sessionStorage.getItem("user");
    const token=sessionStorage.getItem("token")
    let permissionStatus=false;
    const url=state.url.split('/')
    const id=url[3];
    if(user!=null){
      const jsonUser=JSON.parse(user);
      //const role=jsonUser["role"];
      this.role=jsonUser["role"];
      for(let data of this.role){
        if (data==this.patientAdd && this.patientAdd_permission[0]==state.url){
          permissionStatus=true;
          return permissionStatus;
        }
        if (data==this.patientList && this.patientList_permission[0]==state.url){
          permissionStatus=true;
          return permissionStatus;
        }
        if (data==this.stockAdd && this.stockAdd_permission[0]==state.url){
          permissionStatus=true;
          return permissionStatus;
        }
        if (data==this.stockList && this.stockList_permission[0]==state.url){
          permissionStatus=true;
          return permissionStatus;
        }
        if (data==this.meeting && this.meeting_permission[0]==state.url){
          permissionStatus=true;
          return permissionStatus;
        }
        if(data==this.patientList && this.patientDetail_permission[0]+id==state.url){
          permissionStatus=true;
          return permissionStatus;
        }

        //Borç Ekleme
        if(data==this.patientList && this.patientDebt_permission[0]+id==state.url){
          permissionStatus=true;
          return permissionStatus;
        }

        //Cihaz İşlemleri
        if (data==this.deviceOperations && this.deviceOperations_permission[0]==state.url){
          permissionStatus=true;
          return permissionStatus;
        }

        //Userİşlemleri
        if (data==this.userOperations &&this.userOperations_permission[0]==state.url){
          permissionStatus=true;
          return permissionStatus;
        }



      }
      if (token!=null &&state.url=='/Home'){
        permissionStatus=true;
        return permissionStatus;
      }

    }
    else{
      this.router.navigate(["/admin/auth"])
      return permissionStatus;
    }

    if (user!=null && !permissionStatus){
      this.router.navigate(["/Permission"])
    }

    return permissionStatus;
  }

  public userSub(){
    const user=sessionStorage.getItem("user");
    // @ts-ignore
    const userSub=JSON.parse(user);
    return userSub['sub']
  }
  public userId(){
    const user=sessionStorage.getItem("user");
    // @ts-ignore
    const userId=JSON.parse(user);
    return userId['jti']
  }


  logout(){
    sessionStorage.clear();
    this.router.navigate(['/admin/auth'])
  }

  public urlControl( urlArr:string[], url: string  ) : boolean {
    let status = false
    urlArr.forEach( item => {
      if ( item.startsWith(url) ) {
        status = true
      }
    });
    return status;
  }




}
