import { Injectable } from '@angular/core';
import { LoginService } from './login.service';
import { ShopService } from './shop.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private login: LoginService) { }
  canActivate() {
    if (this.login.loggedIn) {
      return true;
    } else {
      return false;
    }
  }
}
