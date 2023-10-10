import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {MeetingaddComponent} from "../components/meeting/meetingadd/meetingadd.component";
import {MessageService} from "primeng/api";
import {Injectable} from "@angular/core";

@Injectable()
export  class Modal {
  ref!:DynamicDialogRef;
  dialogService!:DialogService;
  messageService!:MessageService


}
