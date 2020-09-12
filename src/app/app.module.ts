import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";


import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { PersonalInformationComponent } from './personal-information/personal-information.component';
import { BookappointmentComponent } from './bookappointment/bookappointment.component';
import { ViewappointmentsComponent } from './viewappointments/viewappointments.component';
import { RegistrationService } from './register/registration.service';
import { BookingService } from './bookappointment/booking.service';
import { AppRoutingModule } from './app-routing.module';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient} from '@angular/common/http';
export function HttpLoaderFacotry(http:HttpClient)
{
  return new TranslateHttpLoader(http);
}
@NgModule({
    declarations: [
        AppComponent,
        RegisterComponent,
        LoginComponent,
        DashboardComponent,
        HomeComponent,
        PersonalInformationComponent,
        BookappointmentComponent,
        ViewappointmentsComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        HttpClientModule,
        AppRoutingModule,
        ToastrModule.forRoot(),
        CommonModule,
        BrowserAnimationsModule,
        FontAwesomeModule,
        TranslateModule.forRoot({
            loader:{
              provide:TranslateLoader,
              useFactory:HttpLoaderFacotry,
              deps:[HttpClient]
            }
          })
    ],
    providers: [RegistrationService, BookingService],
    bootstrap: [AppComponent]
})
export class AppModule { }