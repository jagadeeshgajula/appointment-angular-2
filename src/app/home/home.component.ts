import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IsloginService } from '../login/islogin.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isLogin= false;
  
  constructor(private route:Router,private isloginService:IsloginService) {
    this.isloginService.checkIsUserLogin();
    if(localStorage.getItem('uid'))
    {

      this.isloginService.islogin.subscribe(res=>{
        this.isLogin= res;
        console.log(this.isLogin)
      })
      this.route.navigate(["home/dashboard"]);
    }
   }

  ngOnInit(): void {
  }

  logout(){
    //this.isLogin= false;
    this.isloginService.setisLogin(false);
    localStorage.clear();
    this.route.navigate(["/home"]);
  }
}
