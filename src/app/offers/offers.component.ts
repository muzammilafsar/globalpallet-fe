import { Component, OnInit } from '@angular/core';
import { OfferService } from '../offer.service';
import { Router } from '@angular/router';
import { CustomerService } from '../customer.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})
export class OffersComponent implements OnInit {

  offers: Array<any> = [];
  userdata = [];

  constructor(private offerService: OfferService, private router: Router, private cusService: CustomerService) { }
  fetching: Boolean = true;
  name:string;
  
/* To copy any Text */
copyText(val: string){
  let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }


  ngOnInit() {
    this.getCustomer();
    this.fetchOffers();
  }

  fetchOffers() {
    this.fetching = true;
    this.offerService.
      getoffers()
      .subscribe((data: Array<any> = []) => {
        this.offers = data;
        this.fetching = false;
        // console.log('Data requested ...'); 
        // console.log(this.offers); 
      });
  }

  getCustomer() {
    this.cusService.getCustomer().subscribe((data: any[]) => {
        this.userdata = data['userData'];
        // console.log('user data',this.userdata); 
      });
  }

}
