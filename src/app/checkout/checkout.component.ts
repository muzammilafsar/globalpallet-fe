import { Component, OnInit, AfterViewInit } from '@angular/core';
declare var $: any;
import * as $ from 'jquery';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CartService } from '../cart.service';
import { ApiService } from '../api.service';
import { serviceUrl } from '../app.constants';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';
import { AddressService } from '../address.service';
import { LocalityService } from '../locality.service';
import { HttpClient } from '@angular/common/http';
import { ConstantsService } from '../constants.service';
import { CustomerService } from '../customer.service';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit, AfterViewInit {
  localities: any[];
  ipaddress: any;
  devicemsg: String = 'Website';
  instructForm: FormGroup;
  couponForm: FormGroup;
  useraddress: any[] = [];
  loading: Boolean = false;
  verifyLoader: Boolean = false;
  editForm: Boolean = false;
  fetchedAddress;
  createForm: FormGroup;
  addressForm: FormGroup;
  couponSucess: Boolean = false;
  triedCoupon: Boolean = false;
  appliedCoupon;
  couponErrorMsg: String = '';
  saveAddress: Boolean = true;
  disabledOrder: Boolean = false;
  selectedAddress = {};
  discountcpn;
  couponmsg;
  banmsg;
  wallBal = {};

  marked = false;
  theCheckbox = false;
  remainingBalance;

  balanceUsed;

  toggleWallet;

  constructor(private http: HttpClient, private cart: CartService, private api: ApiService, private loginService: LoginService,
    private router: Router, private addressService: AddressService, private localityService: LocalityService,
    private constService: ConstantsService, private cusService: CustomerService) {
    this.createForm = new FormGroup({
      title: new FormControl('', Validators.required),
      first_name: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      address2: new FormControl('', Validators.required),
      pincode: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      locality: new FormControl('', Validators.required)
    });
    this.http.get<{ ip: string }>('https://jsonip.com')
      .subscribe(data => {
        // console.log('th data', data);
        this.ipaddress = data;
      });
  // let FirstComponentObject = new HeaderComponent();
  }
  verifyAvailablity() {
    this.verifyLoader = true;
    const list = [];
    this.cart.productList.map(val => {
      list.push(val.product._id);
    });
    let cartChanges = false;
    let outStock = false;
    this.api.post(serviceUrl.verifyProducts, { products: list }).subscribe((val: Array<any>) => {
      this.cart.productList.map((cart, i) => {
        val.map(pro => {
          if (cart.product._id === pro._id) {
            this.cart.productList[i].qty_avail = pro.qty_1;
            if (pro.qty_1 === 0) {
              outStock = true;
              this.cart.productList[i].outOfStock = true;
              this.cart.remove(pro._id);
            } else if (pro.qty_1 < this.cart.productList[i].quantity) {
              this.cart.productList[i].quantity = pro.qty_1;
              cartChanges = true;
            }
          }
        });
      });
      if (outStock || cartChanges) {
        alert('Products In Cart Are Out Of Stock');
        this.router.navigate(['/menu']);
      }
      localStorage.setItem('cart', JSON.stringify(this.cart.productList));
      this.verifyLoader = false;
    }, err => {
      this.verifyLoader = false;
    });
  }
  setEditMode(bool) {
    this.editForm = bool;
  }
  selectAddress(a) {
    this.selectedAddress = a;
    this.addressForm.patchValue({ ...a, save_address: false });
    // console.log(this.addressForm);
  }
  addAddress() {
    this.loading = true;
    // tslint:disable-next-line:max-line-length
    // console.log("add address wala", this.createForm.value);
    if (this.createForm.valid) {
      this.addressService.addAddress(this.createForm.value).subscribe(val => {
        // console.log("val", val); 
        this.getAllAddress();
        this.loading = false;
      }, (err) => {
        this.loading = false;
        this.getAllAddress();
      });
    }
  }

  walletBalance() {
    this.cusService.getCustomer().subscribe((data: any) => {
      this.wallBal = data;
      //  console.log(this.userdata['userData'].completed_orders); 
    });
  }

  toggleVisibility(e) {
    this.marked = e.target.checked;
    if(this.marked) {
    this.toggleWallet = 'Wallet Applied Successfully';
    this.showToast();
    }
    else {
    this.toggleWallet = 'Wallet Removed Successfully';
    this.showToast();
    }
  }

  showToast() {
    // Get the snackbar DIV
    const x = document.getElementById('snackbar');

    // Add the "show" class to DIV
    x.className = 'show';

    // After 3 seconds, remove the show class from DIV
    setTimeout(function() { x.className = x.className.replace('show', ''); }, 3000);
}

  get itemsCount() {
    return this.cart.getNumberofItems();
  }
  get cartItems() {
    return this.cart.productList;
  }

  cartTotal() {
    return this.cart.CarttotalAmount();
  }

  walletUsedTotal() {
    if (this.cart.CarttotalAmount() >= this.wallBal['userData']['wallet_balance'] && this.theCheckbox) {
      let wallused = this.cart.CarttotalAmount() - this.wallBal['userData']['wallet_balance'];
      this.balanceUsed = this.wallBal['userData']['wallet_balance'];
      this.remainingBalance = 0;// yha remaining balance zero ho jaega
      return wallused;  //ye total h jab wallet k minus ho jaenge 
    }
    if (this.wallBal['userData']['wallet_balance'] > this.cart.CarttotalAmount() && this.theCheckbox) {
      this.remainingBalance = this.wallBal['userData']['wallet_balance'] - this.cart.CarttotalAmount(); // ye wallet ka remaining balance h
      this.balanceUsed = this.cart.CarttotalAmount();
      let wallused = 0; // ye total h jab wallet mei se pese katenge to total mei zero dikhana h aur wallet mei minus krke dikhao
      return wallused;
    }
  }

  // remainingBal() {
  //   if (this.wallBal['userData']['wallet_balance'] > this.cart.CarttotalAmount() && this.theCheckbox) {
  //     return this.cart.remainingBalance;
  //   }
  //   return this.cart.remainingBalance;

  //   return this.remainingBalance;
  // } 

  get appConstant() {
    return this.constService.appConstants.constants;
  }
  deliveryCharges() {
    const amount = this.cart.calculateDelivery();
    // console.log('del charge', amount);

    return amount;
  }
  ngOnInit() {
    this.verifyAvailablity();
    if (this.cart.productList && this.cart.productList.length <= 0) {
      this.router.navigate(['/menu']);
    }
    this.couponForm = new FormGroup({
      'coupon': new FormControl('')
    });
    this.addressForm = new FormGroup({
      'first_name': new FormControl('', Validators.required),
      'title': new FormControl('', Validators.required),
      'address': new FormControl('', Validators.required),
      'address2': new FormControl(''),
      'locality': new FormControl('', Validators.required),
      'state': new FormControl('', Validators.required),
      'pincode': new FormControl(''),
      'save_address': new FormControl(true)
    });

    this.instructForm = new FormGroup({
      'instructions': new FormControl('')
    });
    this.walletBalance();
    this.fetchLocality();
    // this.getAddress();
    this.getAllAddress();
    this.couponForm.reset();

    this.couponSucess = false;
    this.appliedCoupon = null;
    this.cart.appliedCoupon = null;
  }

  fetchLocality() {
    this.localityService.getLocality().subscribe((data: any[]) => {
      this.localities = data;
    });
  }

  applyCoupon() {
    console.log('working');
    this.disabledOrder = true;
    this.triedCoupon = true;
    this.couponSucess = false;
    this.appliedCoupon = null;
    this.cart.appliedCoupon = null;

    if (this.couponForm.valid) {

      if (this.cartItems.filter(s => s['product']['category'] !== 'beverages').length > 0) {

        this.api.post(serviceUrl.applyCoupon, { code: this.couponForm.value.coupon, total: this.cart.subTotal() }).subscribe(val => {
          if (val && val['status'] && val['status'] === 200) {
            if (this.cart.CarttotalAmount() < val['coupon']['min_order_value']) {
              this.couponErrorMsg = `Valid Only On Min. Order Of $${val['coupon']['min_order_value']}`;
            }
            else {
              // Price Off Coupon
              this.discountcpn = val['coupon']['amount'];
              this.couponmsg = val['coupon']['show'];
              this.couponSucess = true;
              this.appliedCoupon = val['coupon'];
              this.cart.appliedCoupon = val['coupon'];
              this.cart.discountCpn = this.discountcpn;
            }
          } else {
            this.couponErrorMsg = val['message'];
          }

          this.disabledOrder = false;
        });
      }
      else {
        console.log('drinks only in cart error');
        this.couponErrorMsg = `Cannot Apply Coupon If Cart Has Only Beverages, Please Add Some Other items!`;
        this.disabledOrder = false;
      }

    }
  }

  ngAfterViewInit() { }

  confirmOrder() {
    // console.log(this.addressForm.value);
    if (this.addressForm.valid) {
      this.disabledOrder = true;
      this.api.post(serviceUrl.newOrder, {
        userip: this.ipaddress && this.ipaddress.ip,
        device: this.devicemsg,
        instruction: this.instructForm.value.instructions,
        address: this.addressForm.value,
        products: this.cart.productList,
        auth: this.loginService.authToken,
        walletused: this.balanceUsed,
        coupon: (this.couponSucess) ? this.couponForm.value.coupon : '',
        couponamount: (this.couponSucess) ? this.discountcpn : ''
      }
      ).subscribe(val => {
        this.banmsg = val['message'];  //for user ban msg trigger

        if (val['status'] === 200) {
          // console.log("confirm order wala", this.addressForm.value);
          this.cart.emptyCart();
          this.couponForm.reset();
          this.router.navigate(['/success'], { queryParams: { orderno: val['order']['order_special_id'] } });
        }

        //  user ban trigger
        else if (val['status'] === 205) {
          this.userban(true);
        }
        this.disabledOrder = false;
      }, (err) => {
      this.disabledOrder = false;
        console.log(err);
      });
    }
  }


  getAllAddress() {
    this.loading = true;
    this.addressService.getAllAddress().subscribe(
      (data: any[]) => {
        this.loading = false;
        this.useraddress = data;
      },
      err => {
        this.loading = false;
      }
    );
  }
  // getAddress() {
  //   this.api.post(serviceUrl.getAddress, {auth: this.loginService.authToken}).subscribe(val => {
  //     if (val['status'] === 200) {
  //       this.addressForm.patchValue({...val['address']});
  //     }
  //   });
  // }

  userban(bool) {
    $('#userban').modal({ show: bool, backdrop: 'static', keyboard: false });
  }
  openModal(bool) {
    $('#myModal').modal({ show: bool, backdrop: 'static', keyboard: false });
  }
  resetForm() {
    this.createForm.reset();
  }

}
