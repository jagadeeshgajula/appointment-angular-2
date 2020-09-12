import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BookingService } from './booking.service';
import { validateRegistrationDate } from '../register/registrationdate.validator';
import { Router } from '@angular/router';
@Component({
  selector: 'app-bookappointment',
  templateUrl: './bookappointment.component.html',
  styleUrls: ['./bookappointment.component.css']
})
export class BookappointmentComponent implements OnInit {

  constructor(private bookingService: BookingService,private router:Router) {

    this.bookappointmentFormObj = new FormGroup(this.bookappointmentFormValidations);
    if(!localStorage.getItem('uid'))
    {
      this.router.navigate(["/login"]);
    }
  }

  ngOnInit(): void {
  }

  bookappointmentFormObj: FormGroup;
  bookappointmentFormValidations = {
    timezone: new FormControl("", Validators.required),
    appointmentType: new FormControl('', Validators.required),
    startDate: new FormControl('', [Validators.required, validateRegistrationDate]),
    title: new FormControl('', Validators.required),
    startTime: new FormControl('', Validators.required),
    endTime: new FormControl('', Validators.required),
    location: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    comments: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    userId: new FormControl(localStorage.getItem('uid'))
  };

  submitAppointment() {
    if (!this.bookappointmentFormObj.valid) {
      alert('Not a Valid Form, Please Check All Fields ');
      return;
    }
    this.endTimeCheck();
    this.bookingService.saveAppointment(this.bookappointmentFormObj.value).subscribe(response => {

      alert(localStorage.getItem("un")+" Successfully Booked your Appointment ")
      this.bookappointmentFormObj.reset();
      this.bookappointmentFormObj.get('userId').setValue(localStorage.getItem('uid'));
    },
      error => {
        alert("Something went wrong ")
      })
  }

  endTimeCheck() {
    var timefrom = new Date();
    var temp = this.bookappointmentFormObj.get('startTime').value.split(":");
    timefrom.setHours((parseInt(temp[0]) - 1 + 24) % 24);
    timefrom.setMinutes(parseInt(temp[1]));

    var timeto = new Date();
    temp = this.bookappointmentFormObj.get('endTime').value.split(":");
    timeto.setHours((parseInt(temp[0]) - 1 + 24) % 24);
    timeto.setMinutes(parseInt(temp[1]));

    if (timeto < timefrom) {
      alert('End time should be grater than start time!');
      return;
    }
  }

  navigate(){

    this.router.navigate(["/dashboard"]);
  }
}
