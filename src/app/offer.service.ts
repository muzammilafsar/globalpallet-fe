import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class OfferService {

  constructor(private api: ApiService) { }

  getoffers() {
    return this.api.get(`/get_all_offer`);
  }
  
  getOffersById(id) {
    return this.api.post(`/get_offer`, {id});
  }

}
