import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  confirmedOrder = null;
  //  baseUrl = 'http://localhost:3000';
  baseUrl = 'https://globalpallet-be.onrender.com'; 

  allCatWithSubCat = [];
  productDesction = {};
  constructor(private http: HttpClient, private login: LoginService) { }
  get(url) {
    return this.http.get(`${this.baseUrl}${url}`);
  }
  post(url, body) {
    if (this.login.loggedIn) {
      body.auth = this.login.authToken;
    }
    return this.http.post(`${this.baseUrl}${url}`, body);
  }
}
