import { Injectable } from '@angular/core';
import { serviceUrl } from './app.constants';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AddressService {


  constructor(private api: ApiService) { }

  getAddress(id) {
    return this.api.post(`/getaddress`, {id});
  }
  getAllAddress() {
    return this.api.post(`/getalladdress`, {});
  }

  addAddress(address) {
    return this.api.post(`/addaddress`, {address});
  }

  // tslint:disable-next-line:max-line-length
  editAddress(id, address) {
    const useraddress = {
      title: address.title,
      first_name: address.first_name,
      address: address.address,
      address2: address.address2,
      locality: address.locality,
      state: address.state,
      pincode: address.pincode
    };
    return this.api.post(`/editaddress`, {address: useraddress, id : id});
  }

  deleteAddress(id) {
    return this.api.post(`/deleteaddress`, {id : id});
  }
}
