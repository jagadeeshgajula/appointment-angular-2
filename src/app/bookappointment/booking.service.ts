import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private httpClient : HttpClient) { }

  saveAppointment(app)
   {
     return this.httpClient.post("http://localhost:6001/saveAppointment", app);
   }

   getAppointmentByUId(uId)
   {
     return this.httpClient.get("http://localhost:6001/getAppointmentsByUId?userId="+ uId);
   }
}
