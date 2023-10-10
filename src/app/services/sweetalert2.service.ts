import {Injectable} from '@angular/core';
import Swal from "sweetalert2";
import {PatientnoteComponent} from "../components/patients/patientnote/patientnote.component";
import {BaseService} from "./Base.service";
import {Toast} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class Sweetalert2Service {

  sweetdel = false;
  return=false;

  constructor() {
  }

  toastSuccess(message:any) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      showCloseButton: true,
      timer: 5000,
      timerProgressBar: true,
      background:'btn btn-red',
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    Toast.fire({
      icon: 'success',
      title: message

    })
  }
  toastError(message:any) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      showCloseButton: true,
      timer: 5000,
      timerProgressBar: true,
      background:'btn btn-red',
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    Toast.fire({
      icon: 'error',
      title: message

    })
  }


  sweetDelete() {
    this.sweetdel = false;
    return Swal.fire({
      title: 'Silmek İstediğinizden Emin Misiniz ?',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Hayır',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Evet',
    }).then(result => {
      if (result.isConfirmed) {
        this.sweetdel = true;
        Swal.fire(
          'Kayıt Başarı İle Silindi !!!',
          '',
          'success'
        )
      }
    })
  }

  saveMessage(message:any){
    this.return=false;
     return Swal.fire({
      title:message,
      icon:"success",
      confirmButtonText:'Evet'
    }).then(result=>{
      if (result.isConfirmed ||result.dismiss){
        this.return=true;
      }
    })
  }




}
