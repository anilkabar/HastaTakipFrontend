import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PatientaddComponent } from './components/patients/patientadd/patientadd.component';
import { PatientdetailComponent } from './components/patients/patientdetail/patientdetail.component';
import { PatientsComponent } from './components/patients/patients.component';
import {DeviceoperationsComponent} from "./components/settings/deviceoperations/deviceoperations.component";
import {StockaddComponent} from "./components/stock/stockadd/stockadd.component";
import {StocklistComponent} from "./components/stock/stocklist/stocklist.component";
import {PatientdebtComponent} from "./components/patients/patientdebt/patientdebt.component";
import {MeetingComponent} from "./components/meeting/meeting.component";
import {MeetingaddComponent} from "./components/meeting/meetingadd/meetingadd.component";
import {AutGuard} from "./aut.guard";
import {PermissionComponent} from "./components/errorpage/permission/permission.component";
import {UseroperationsComponent} from "./components/settings/useroperations/useroperations.component";
import {UserprivilegesComponent} from "./components/settings/userprivileges/userprivileges.component";
import {PatientdeptorallComponent} from "./components/patients/patientdebt/patientdeptorall/patientdeptorall.component";


const routes: Routes = [
  {path:'admin/auth',loadChildren:()=>import('./admin/admin.module').then(m=>m.AdminModule)},
  {path:'Home',component:HomeComponent,canActivate:[AutGuard]},
  {path:'', redirectTo:'Home',pathMatch:'full',},
  {path:'Patients',component:PatientsComponent,canActivate:[AutGuard]},
  {path:'Patients/PatientDetail',component:PatientdetailComponent,canActivate:[AutGuard]},
  {path:'Patients/PatientAdd',component:PatientaddComponent,canActivate:[AutGuard]},
  {path:'Patient/PatientDetail/:patientId',component:PatientdetailComponent,canActivate:[AutGuard]},
  {path:'Patient/PatientDebt/:patientId',component:PatientdebtComponent,canActivate:[AutGuard]},
  {path:'Stock/StockAdd',component:StockaddComponent,canActivate:[AutGuard]},
  {path:'Settings/DeviceOperations',component:DeviceoperationsComponent,canActivate:[AutGuard]},
  {path:'Stock/StockList',component:StocklistComponent,canActivate:[AutGuard]},
  {path:'Meeting',component:MeetingComponent,canActivate:[AutGuard]},
  {path:'Meeting/MeetingAdd',component:MeetingaddComponent,canActivate:[AutGuard]},
  {path:'Settings/UserOperations',component:UseroperationsComponent,canActivate:[AutGuard]},
  {path:'Settings/UserPrivileges/:userId',component:UserprivilegesComponent},
  {path:'Patient/PatientDebtAll',component:PatientdeptorallComponent},
  {path:'Permission',component:PermissionComponent},
  {path:'**',redirectTo:'Home',pathMatch:'full'}


];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    {onSameUrlNavigation:'reload'}
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
