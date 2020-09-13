import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient) { }
  login(loginRequest) {
    return this.httpClient.post("http://localhost:6001/authenticate", loginRequest);
  }
}
