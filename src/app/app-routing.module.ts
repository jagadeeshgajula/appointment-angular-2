import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PersonalInformationComponent } from './personal-information/personal-information.component';
import { BookappointmentComponent } from './bookappointment/bookappointment.component';
import { ViewappointmentsComponent } from './viewappointments/viewappointments.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: "", redirectTo: "/home", pathMatch: "full" },

  {
    path: "home", component: HomeComponent, children: [
      { path: "register", component: RegisterComponent },
      { path: "login", component: LoginComponent },
      {
        path: "dashboard", component: DashboardComponent, children: [
          { path: "personal-information", component: PersonalInformationComponent },
          { path: "bookappointment", component: BookappointmentComponent },
          { path: "viewappointments", component: ViewappointmentsComponent }
        ]
      },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
