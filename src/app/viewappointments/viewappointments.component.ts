import { Component, OnInit } from '@angular/core';
import { BookingService } from '../bookappointment/booking.service';
import { Router } from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
@Component({
  selector: 'app-viewappointments',
  templateUrl: './viewappointments.component.html',
  styleUrls: ['./viewappointments.component.css']
})
export class ViewappointmentsComponent implements OnInit {

  constructor(private bookingService: BookingService,private router:Router,public translate:TranslateService) {
   
    translate.addLangs(['en','fr']);
    translate.setDefaultLang('en');
    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|fr/)?browserLang:'en');

    if(!localStorage.getItem('uid'))
    {
      this.router.navigate(["/login"]);
    }
    this.getListOffappointments();
   }

  ngOnInit(): void {
    
  }
  exists=false;
  appointmentsList:any=[]
  getListOffappointments()
  {
    this.bookingService.getAppointmentByUId(localStorage.getItem('uid')).subscribe(res=>{
      if(res['length']>0)
      {
        this.appointmentsList = res;
      }
      else{
        this.exists=true;
        
      }
      
    },error=>{

    })
  }

  navigate(){

    this.router.navigate(["/dashboard"]);
  }
}
