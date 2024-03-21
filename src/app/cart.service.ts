import { Injectable } from '@angular/core';
import { ConstantsService } from './constants.service';
import { CustomerService } from './customer.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  appliedCoupon = null;
  productList = [];
  delcharge = {};
  discountCpn;
  // wallBal;
  // remainingBalance;

  constructor(private constantsService: ConstantsService, private cus: CustomerService) {
    // this.fetchConstants();
    // this.walletBalance();
    const list  = JSON.parse(localStorage.getItem('cart'));
    if (list) {
      this.productList = list;
    }
  }

  getNumberofItems() {
    let count = 0;
    this.productList.map(val => {
      count = count + val.quantity;
    });
    return count;
  }

  addItem(product) {
    let found = false;
    this.productList.map(val => {
      if (product.product._id === val.product._id && product.size === val.size ) {
        found = true;
      }
    });
    if (found) {
      return this.increment(product);
    } else {
      product.quantity = 1;
      product.price = product.product[`price_${product.size.split('_')[1]}`];
      product.qty_avail = product.product[`qty_${product.size.split('_')[1]}`];
      this.productList.push(product);
      this.saveList();
      return true;
    }
  }

  increment(product) {
    const index = this.productList.findIndex(val => val.product._id === product.product._id && product.size === val.size);
    this.productList[index].qty_avail = product.product[`qty_${product.size.split('_')[1]}`];
    if (this.productList[index].qty_avail > this.productList[index].quantity) {
      this.productList[index].quantity = this.productList[index].quantity + 1;
      this.productList[index].qty_avail = product.qty_avail;
      this.saveList();
      return true;
    } else {
      return false;
    }
  }

  decrement(product) {
    const index = this.productList.findIndex(val => val.product._id === product.product._id && product.size === val.size);
    if ( this.productList[index].quantity > 1) {
      this.productList[index].quantity = this.productList[index].quantity - 1;
    } else {
      this.productList.splice(index, 1);
    }
    this.saveList();
  }

  remove(product) {
    const index = this.productList.findIndex(val => val.product._id === product);
    this.productList.splice(index, 1);
    this.saveList();
  }
  saveList() {
    console.log(this.productList);
    localStorage.setItem('cart', JSON.stringify(this.productList));
  }

  emptyCart() {
    localStorage.removeItem('cart');
    this.productList = [];
  }

  subTotal() {
    let total = 0;
    this.productList.map(val => {
      total = total + (val.price * val.quantity);
    });
    return total;
  }

  couponValue() {
    if (this.appliedCoupon) {
      return this.discountCpn;
    }
    return 0;
  }

  // walletBalance() {
  //   this.cus.getCustomer().subscribe((data: any) => {
  //         this.wallBal = data['userData']['wallet_balance']; 
  //   });
  // }

  CarttotalAmount() {
    let total = this.calculateDelivery() - this.couponValue() + this.subTotal();
      if (total < 0) {
            total = 0;
      }
      return total; 
  }

  // walletUsed() {
  //   if(this.CarttotalAmount() >= this.wallBal) {
  //     let wallused = this.CarttotalAmount() - this.wallBal;
  //     this.remainingBalance = 0;// yha remaining balance zero ho jaega
  //     return wallused;  //ye total h jab wallet k minus ho jaenge 
  //     }
  //     if(this.wallBal > this.CarttotalAmount()) {
  //     this.remainingBalance = this.wallBal - this.CarttotalAmount(); // ye wallet ka remaining balance h
  //     let wallused = 0; // ye total h jab wallet mei se pese katenge to total mei zero dikhana h aur wallet mei minus krke dikhao
  //     return wallused;
  //     }
  // }

  calculateDelivery() {  
    if (this.subTotal() > this.constantsService.appConstants.constants.freeDeliveryAmount ) {
      return 0; // free delivery will be calculated from here if order fulfills the condition
    } else {
      return this.constantsService.appConstants.constants.deliveryCharge; // delivery charges coming here
    }
  }

  get AppConstants() {
    return this.constantsService.appConstants;
  }
  // fetchConstants() {
  //   this.constantsService.getConstant().subscribe((data) => {
  //     this.delcharge = data;
  //       console.log(this.delcharge);
  //     });
  // }
}
