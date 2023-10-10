import { Injectable } from '@angular/core';
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(
    private toastr:ToastrService
  ) { }

  toastSucccess(messages:any){
    this.toastr.success(messages)
  }
  toastError(messages:any){
    this.toastr.error(messages)
  }
}
