import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class MessageControlService {

  constructor() {}
  ShowSuccess = (ParamMsg: any, ) => {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: ParamMsg,
      showConfirmButton: true,
    })
  }



  ShowError = (ParamMsg: any) => {
    Swal.fire({
      position: 'top-end',
      icon: 'error',
      title: ParamMsg,
      showConfirmButton: true,
    })
  }
  
}
