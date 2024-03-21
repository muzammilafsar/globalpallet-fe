import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { serviceUrl } from '../app.constants';
declare var $: any;
import { CustomerContactService } from '../customer-contact.service';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  createForm: FormGroup;
  date = Date.now();
  orders = [];
  activeorders = [];
  constructor(private api: ApiService, private customercontactService: CustomerContactService, private fb: FormBuilder, private router: Router) { 
    
    this.createForm = this.fb.group({
      Order_id: ['', Validators.required],
      subject: ['', Validators.required],
      name: ['', Validators.required],
      mobile: ['', Validators.required],
      comment: ['', Validators.required]
      });
   }

  selectedUserName;
  selectedOrderId;
  selectedUserMob;

  selectedOrderTotal;
  selecteditems;

  fetching: Boolean = true;
  cancelOrderId = '';
  errorMsg = '';
  error = false;

  allorderbit = false;
  hidebutton = true;

  couponForm: FormGroup;
  cancelreason = [];
  selectedcancelreason;
  
  cancelOrder() {
    this.api.post('/cancelorder', {order_id: this.cancelOrderId, reason: this.couponForm.value.cancelreasons}).subscribe(val => {
      if (val && val['status'] && val['status'] === 200) {
        this.error = false;
        this.errorMsg = 'Order Cancelled Successfully!!';
      } else {
        this.error = true;
        this.errorMsg = val['message'];
      }
      this.openModal();
      this.getActiveOrders();
      this.getOrders();
    });
  }

  openModal() {
    $('#cancelError').modal({show: true});
  }

  setOrderId(id) {
    console.log(id); 
    this.cancelOrderId = id;
  }

  addIssues(Order_id, subject, name, mobile, comment) {
    this.customercontactService.addIssues(Order_id, subject, name, mobile, comment).subscribe(() => {
      this.showToast();
      this.router.navigate(['/myorders']);
      this.createForm.reset();
      console.log("Form Submitted!");
    });
  }

  ngOnInit() {
    // this.getOrders();
    this.getActiveOrders();
    this.getcancelreson();

    setInterval((orders)=> {
      return this.getActiveOrders();
    }, 3*60*1000);

    this.couponForm = new FormGroup({
      'cancelreasons' : new FormControl(['', Validators.required])
    });
  }
  getOrders() {
    this.fetching = true;
    this.api.post(serviceUrl.getOders, {}).subscribe(val => {
      this.orders = val['orders'];
      this.fetching = false;
    });
  }

  onAllOrders() {
  this.allorderbit = false;
  this.api.post(serviceUrl.getOders, {}).subscribe(val => {
    this.orders = val['orders'];
    this.allorderbit = true;
    this.hidebutton = false;
  });
  }

  onHide() {
    document.getElementById('hidebtn').style.display = 'none';
    document.getElementById('hidebtnn').style.display = 'none';
    this.hidebutton = true;
  }

  getActiveOrders() {
    this.fetching = true;
    this.api.post(serviceUrl.getActiveOrders, {}).subscribe(val => {
      this.activeorders = val['orders'];
      // console.log("active orders", val['orders']);
      this.fetching = false;
    });
  }

  getcancelreson() {
    this.api.get(`/getcancelreasons`).subscribe((val: any) => {
      this.cancelreason = val;
      // console.log("cancel reasons", val); 
    });
  }

  showToast() {
    // Get the snackbar DIV
    const x = document.getElementById('snackbar');

    // Add the "show" class to DIV
    x.className = 'show';

    // After 3 seconds, remove the show class from DIV
    setTimeout(function() { x.className = x.className.replace('show', ''); }, 3000);
}

}
