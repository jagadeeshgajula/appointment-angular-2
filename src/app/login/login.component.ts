import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import * as $ from "jquery";
import { ToastrService } from 'ngx-toastr';
import { IsloginService } from './islogin.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService, private route: Router, private toastr: ToastrService,
    private isloginService: IsloginService) {
    this.loginFormObj = new FormGroup(this.loginFormValidations);
  }

  ngOnInit(): void {

  }

  message = undefined;
  loginFormObj: FormGroup;
  loginFormValidations = {
    userName: new FormControl("", Validators.required),
    password: new FormControl('', Validators.required)
  };

  loginFormSubmit() {
    if (!this.loginFormObj.valid) {
      this.toastr.warning('Not a valid form', 'Please Fill Required Fields', {
        timeOut: 3000,
      });
      return;
    }

    let payload = Object(this.loginFormObj.value)
    this.loginService.login(payload).subscribe(response => {
      if (response != null && response != undefined) {
        this.toastr.success('Loggedin Successfully', '', {
          timeOut: 3000,
        });
        localStorage.setItem("uid", response['id'])
        localStorage.setItem("un", response['userName'])
        localStorage.setItem("token", "Bearer " + response['token'])
        this.isloginService.setisLogin(true);
        this.route.navigate(["home/dashboard"]);
      }
      else {
        this.toastr.error('Please Check Your Credentials', 'Wrong Username or Password', {
          timeOut: 3000,
        });
      }
    },
      error => {
        this.toastr.error('Exception Occured', 'Major Error', {
          timeOut: 3000,
        });
      }
    )
  }
}
