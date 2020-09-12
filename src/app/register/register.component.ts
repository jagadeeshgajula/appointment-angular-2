import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { validateDOB } from './customedate.validator';
import { validateRegistrationDate } from './registrationdate.validator';
import { RegistrationService } from './registration.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private registrationService: RegistrationService, private router:Router) {

    this.registerFormObj = new FormGroup(this.registerFormValidations);

  }

  ngOnInit(): void {
    this.countries = [{ cId: 1, name: "India" }, { cId: 2, name: "UK" }, { cId: 3, name: "US" }];
    this.states = [{ sId: 1, cId: 1, name: "Andhra Pradesh" }, { sId: 2, cId: 1, name: "Madhya Pradesh" }, { sId: 3, cId: 1, name: "Uttar Pradesh" },
    { sId: 4, cId: 2, name: "wales" }, { sId: 5, cId: 2, name: "Scottland" }, { sId: 6, cId: 2, name: "Ireland" },
    { sId: 7, cId: 3, name: "Alaska" }, { sId: 8, cId: 3, name: "california" }, { sId: 9, cId: 3, name: "Florida" }]
  }
  countries = [];
  states = [];
  statesOnCountrySelected = [];
  registerFormObj: FormGroup;
  registerFormValidations = {

    name: new FormControl('', Validators.pattern(/^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/)),
    userName: new FormControl(''),
    password: new FormControl(''),
    guardianType: new FormControl(''),
    guardianName: new FormControl(''),
    address: new FormControl(''),
    citizenship: new FormControl(''),
    state: new FormControl(''),
    country: new FormControl(''),
    email: new FormControl('', [Validators.email]),
    gender: new FormControl('F'),
    maritalStatus: new FormControl(''),
    contactNumber: new FormControl('', [Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
    dateOfBirth: new FormControl('', [validateDOB]),
    registrationDate: new FormControl('', [validateRegistrationDate]),
    timeZone: new FormControl(''),
    bloodType: new FormControl(''),
    countryVisited: new FormControl('', [Validators.required]),
    citizenStatus: new FormControl(''),
    displayName: new FormControl('', Validators.required),
    supplierorinsurername: new FormControl(''),
    ssnNumber: new FormControl('', Validators.required),


  };

  registrationFormSubmit() {

    if(this.registerFormObj.get('ssnNumber').errors || this.registerFormObj.get('displayName').errors || 
    this.registerFormObj.get('countryVisited').errors){
      alert("Please Fill Mandatory Fields");
      return;
    }
    console.log(this.registerFormObj.valid);
    if(!this.registerFormObj.valid){
      alert('Not a Valid Form, Please Check All Fields and Formats');
      return;
    }
    console.log(this.registerFormObj.value);

    this.registrationService.saveUser(this.registerFormObj.value).subscribe(response=>{
      alert("Successfully Registered : "+ response['memberId'])
      this.registerFormObj.reset()
      this.router.navigate(["/login"]);
    },error=>{
      alert("Error Occured Please Check")
    })
  }

  dateDiff(event) {
    var date1 = new Date();
    var date2 = event.target.value;
    var diff = date1.getFullYear() - new Date(date2).getFullYear();
    console.log(diff);

    if (diff >= 60) {
      this.registerFormObj.get('citizenStatus').setValue("Senior Citizen")
    }
    else if(diff >=18){
      this.registerFormObj.get('citizenStatus').setValue("Citizen")
    }
    else {
      this.registerFormObj.get('citizenStatus').setValue("Minor")
    }

  }

  countrySelected(event) {
    this.statesOnCountrySelected = [];
    for (var i = 0; i < this.states.length; i++) {
      if (this.states[i]['cId'] == event.target.value) {
        this.statesOnCountrySelected.push(this.states[i]);
      }
    }
  }
}