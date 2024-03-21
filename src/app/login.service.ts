import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  loggedIn = false;
  authToken = '';
  constructor() {
    const auth = localStorage.getItem('auth');
    this.authToken = auth;
    // console.log(auth); 
    if (auth) {
      this.loggedIn = true;
      // console.log(this.loggedIn); 
    }
  }
  logout() {
    localStorage.removeItem('auth');
    window.location.reload();
  }
}
