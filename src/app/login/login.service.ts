import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient) { }
  login(userName, password)
  {
    return this.httpClient.get("http://localhost:6001/findUser?userName="+userName+"&password="+password)
  }
}
