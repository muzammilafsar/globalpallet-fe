import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private api: ApiService) {
  }

getCustomer() {
return this.api.post('/getuserdata', {});
}

cancelFeedback() {
  return this.api.post('/cancelfeedback', {});
  }

sendFeedback( name, order, overall, behavior, packaging, timely ) {
  const feedback = { overall, behavior, packaging, timely }
  const fdbk = {
    name: name,
    order: order,
    feedback: feedback
  };
  return this.api.post(`/newfeedback`, fdbk);
  // return this.api.post(`${this.uri}/createissue`, customercontact);
}
 
}
