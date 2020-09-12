import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IsloginService {
  subject = new BehaviorSubject<any>(undefined)
  islogin;
  constructor() {
    this.islogin= this.subject.asObservable();
   }
  
  setisLogin(flag){
    this.subject.next(flag);
    console.log(flag);
    console.log(this.subject)
  }

  checkIsUserLogin()
  {
    var flag = (localStorage.getItem('uid') != null && localStorage.getItem('uid') != undefined)?true:false
    this.setisLogin(flag);
  }
  
}
