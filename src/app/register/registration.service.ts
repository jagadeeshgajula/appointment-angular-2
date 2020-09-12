import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private httpClient: HttpClient) {

  
   }
   saveUser(reg)
   {
     return this.httpClient.post("http://localhost:6001/saveUser", reg);
   }

   getUserByUId(uId)
   {
     return this.httpClient.get("http://localhost:6001/getUserByUId?userId="+ uId);
   }

   updateUser(reg)
   {
     return this.httpClient.put("http://localhost:6001/updateUser", reg);
   }
}
