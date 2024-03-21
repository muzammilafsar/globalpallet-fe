import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class PartyorderService {

  // uri = 'https://foodserveapp.herokuapp.com';

  constructor(private http: HttpClient, private api: ApiService) { }

  addPartyOrders(event_name, amount_people, date, name, mobile, comment) {
    const partyorders = {
      event_name: event_name,
      amount_people: amount_people,
      date: date,
      name: name,
      mobile: mobile,
      comment: comment
    };
    return this.api.post(`/createpartyorder`, partyorders);
    // return this.api.post(`${this.uri}/createpartyorder`, partyorders);
  }
  
}
