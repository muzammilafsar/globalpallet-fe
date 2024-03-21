import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

interface AppConstants {
  _id: String;
  key: String;
  constants: {
    deliveryCharge: number,
    freeDelivery: Boolean,
    freeDeliveryAmount: number,
    quantityLimit: number
  }
}

interface MessageConstants {
  _id: String;
  key: String;
  constants: {
   opening: String,
   closing: String,
   notice: String,
   heading: String,
   days: String,
   time: String,
   night: String
  }
}

@Injectable({
  providedIn: 'root'
})
export class ConstantsService {

  // these constants will be used when api get failed
  appConstants: AppConstants = {
  _id: '',
  key: 'serviceData',
  constants: {
    deliveryCharge: 30, // deliver charge
    freeDelivery: false, // for providing free delivery
    freeDeliveryAmount: 249, // free delivery for order above 200
    quantityLimit: 18   // cart quantity limit 
  }
  };

  messageConstants: MessageConstants = {
    _id: '',
    key: 'serviceTimings',
    constants: {
      opening: '',
      closing: '',
      notice: '',
      heading: '',
      days: '',
      time: '',
      night: ''  // unavailability message 
    }
    };

  constructor(private api: ApiService) {
    this.getMessage();
    this.getConstant();
  }

  getConstant() {
    this.api.post('/get_constant', {key: 'serviceData'}).subscribe(( val: AppConstants) => {
      val.constants.deliveryCharge = parseInt(val.constants.deliveryCharge.toString(), 10);
      val.constants.freeDeliveryAmount = parseInt(val.constants.freeDeliveryAmount.toString(), 10);
      val.constants.quantityLimit = parseInt(val.constants.quantityLimit.toString(), 10);
      this.appConstants = val;
    });
  }

  getMessage() {
    this.api.post('/get_constant', {key: 'serviceTimings'}).subscribe(( val: MessageConstants) => {
      val.constants.opening = val.constants.opening;
      val.constants.closing = val.constants.closing;
      val.constants.notice = val.constants.notice;
      val.constants.heading = val.constants.heading;
      val.constants.days = val.constants.days;
      val.constants.time = val.constants.time;
      val.constants.night = val.constants.night;
      this.messageConstants = val;
      // console.log(this.messageConstants); 
    });
  }



}
