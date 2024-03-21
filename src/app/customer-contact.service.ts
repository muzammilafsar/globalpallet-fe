import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerContactService {

  // uri = 'https://foodserveapp.herokuapp.com';

  constructor(private http: HttpClient, private api: ApiService) { }

    addIssues(Order_id, subject, name, mobile, comment) {
      const customercontact = {
        Order_id: Order_id,
        subject: subject,
        name: name,
        mobile: mobile,
        comment: comment
      };
      return this.api.post(`/createissue`, customercontact);
      // return this.api.post(`${this.uri}/createissue`, customercontact);
    }

  }

