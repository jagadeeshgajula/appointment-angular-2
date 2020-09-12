import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private route:Router) {
    if(!localStorage.getItem('uid'))
    {
      this.route.navigate(["/login"]);
    }
   }

  ngOnInit(): void {
  }

  logout(){
    localStorage.clear();
    
      this.route.navigate(["/home"]);
  }
}
