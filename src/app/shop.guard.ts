import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ShopService } from './shop.service';

@Injectable({
  providedIn: 'root'
})
export class ShopGuard implements CanActivate {
  constructor(private shop: ShopService) {

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if (!this.shop.fetchingTimings && !this.shop.open) {
        return false;
      } else {
        return true;
      }
  }
}
