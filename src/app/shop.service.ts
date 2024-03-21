import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { serviceUrl } from './app.constants';
declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  fetchingTimings: Boolean = true;
  open: Boolean = false;
  
  constructor(private api: ApiService) {
    // console.log('shoping'); 
    this.getShopTimings();
    // this.getOcassional();
  }

  getShopTimings() {
    this.fetchingTimings = true;
  return this.api.get(serviceUrl.shopTiming).subscribe((val: Boolean) => {
    // console.log(val); 
    this.open = val;
    this.fetchingTimings = false;
  }, err => {
    this.fetchingTimings = false;
  });
  }

  // getOcassional() {
  //   return this.api.get(`/ocassional`);
  // }

}
