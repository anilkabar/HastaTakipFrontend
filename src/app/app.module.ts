import { NgModule } from '@angular/core';
import {FormsModule, NgForm, ReactiveFormsModule} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { LeftbarComponent } from './components/layout/leftbar/leftbar.component';
import { PatientdetailComponent } from './components/patients/patientdetail/patientdetail.component';
import { PatientsComponent } from './components/patients/patients.component';
import { HttpClientModule } from '@angular/common/http';
import {ToastrModule} from "ngx-toastr";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { PatientnoteComponent } from './components/patients/patientnote/patientnote.component';
import {SweetAlert2Module} from "@sweetalert2/ngx-sweetalert2";
import { LenghtPipe } from './pipes/lenght.pipe';
import {OrderModule} from "ngx-order-pipe";
import {PatientaddComponent} from "./components/patients/patientadd/patientadd.component";
import { DeviceoperationsComponent } from './components/settings/deviceoperations/deviceoperations.component';
import {NgxPaginationModule} from "ngx-pagination";
import { StockaddComponent } from './components/stock/stockadd/stockadd.component';
import {AdminModule} from "./admin/admin.module";
import { StocklistComponent } from './components/stock/stocklist/stocklist.component';
import { StockfilterPipe } from './pipes/stockfilter.pipe';
import { PatientdocumentComponent } from './components/patients/patientdocument/patientdocument.component';
import { PatientexaminationComponent } from './components/patients/patientexamination/patientexamination.component';
import {NgxExtendedPdfViewerModule} from "ngx-extended-pdf-viewer";
import { PatientdebtComponent } from './components/patients/patientdebt/patientdebt.component';
import { PaymentaddComponent } from './components/patients/patientdebt/paymentadd/paymentadd.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AdddevicesaleComponent } from './components/patients/patientdebt/adddevicesale/adddevicesale.component';
import {DatePipe} from "@angular/common";
import { MeetingComponent } from './components/meeting/meeting.component';
import {FullCalendarModule} from "@fullcalendar/angular";
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction'; // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { MeetingaddComponent } from './components/meeting/meetingadd/meetingadd.component';
import {TableModule} from "primeng/table";
import {DialogService, DynamicDialogModule} from "primeng/dynamicdialog";
import {MessageService} from "primeng/api";
import {Modal} from "./utils/modal";
import {DialogModule} from "primeng/dialog";
import {ButtonModule} from "primeng/button";
import {AutGuard} from "./aut.guard";
import { PermissionComponent } from './components/errorpage/permission/permission.component';
import { UseroperationsComponent } from './components/settings/useroperations/useroperations.component';
import {InputSwitchModule} from "primeng/inputswitch";
import { UserprivilegesComponent } from './components/settings/userprivileges/userprivileges.component';
import {MultiSelectModule} from "primeng/multiselect";
import {CheckboxModule} from "primeng/checkbox";
import { PatientdeptorallComponent } from './components/patients/patientdebt/patientdeptorall/patientdeptorall.component';


FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  timeGridPlugin,
  interactionPlugin,
  listPlugin


]);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LeftbarComponent,
    HeaderComponent,
    FooterComponent,
    PatientdetailComponent,
    PatientsComponent,
    PatientaddComponent,
    PatientnoteComponent,
    LenghtPipe,
    DeviceoperationsComponent,
    StockaddComponent,
    StocklistComponent,
    StockfilterPipe,
    PatientdocumentComponent,
    PatientexaminationComponent,
    PatientdebtComponent,
    PaymentaddComponent,
    AdddevicesaleComponent,
    MeetingComponent,
    MeetingaddComponent,
    PermissionComponent,
    UseroperationsComponent,
    UserprivilegesComponent,
    PatientdeptorallComponent,


  ],
  imports: [
    BrowserModule,
    AdminModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    OrderModule,
    BrowserAnimationsModule,
    SweetAlert2Module.forRoot(
    ),
    ToastrModule.forRoot({
        progressBar: true,
        closeButton: true,
        positionClass: 'toast-top-right'
      },
    ),
    ReactiveFormsModule,
    NgxPaginationModule,
    AppRoutingModule,
    NgxExtendedPdfViewerModule,
    NgbModule,
    FullCalendarModule,
    TableModule,
    DynamicDialogModule,
    DialogModule,
    ButtonModule,
    InputSwitchModule,
    MultiSelectModule,
    CheckboxModule,


  ],
  providers: [
    DatePipe,
    DialogService,
    MessageService,
    Modal,
    AutGuard

  ],
  exports: [
    HeaderComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
