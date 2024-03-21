import { Component, OnInit } from '@angular/core';
declare var $: any;
import { ApiService } from '../api.service';
import { serviceUrl, categories } from '../app.constants';
import { CategoryService } from '../category.service';
import { CartService } from '../cart.service';
import { FormArray, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { LoginService } from '../login.service';
import { ActivatedRoute } from '@angular/router';
import { ShopService } from '../shop.service';
import { ConstantsService } from '../constants.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  
  toastMsg = '';
  products: Array<any> = [];
  category = [];

  constructor(private api: ApiService, private cart: CartService, private formBuilder: FormBuilder,
  private loginService: LoginService, private route: ActivatedRoute, private shop: ShopService, 
  private categoryService: CategoryService, private constservice: ConstantsService) { }

  productForm: FormArray;
  selectedtab = 0;
  selectedProd;
  fetching = true;
  selectedProduct = {};
  searchText = '';

  setProduct(id) {
    console.log(id);
    const item = this.products.filter(val => {
      return val._id === id;
    });
    console.log(item[0]);
    this.api.productDesction = item[0];
    console.log(this.api.productDesction);
    this.openModal();
  }

  get selectedItem() {
    return this.api.productDesction;
  }

  get notAvailable() {
    return (!this.shop.fetchingTimings && !this.shop.open);
  }

  openModal() {
    $('#myModal').modal({show: true});
  }

  ngOnInit() {
  this.fetchCategory();
  // this.category = categories;
  this.cart.appliedCoupon = null;
  // this.productForm = this.formBuilder.array([]);
  this.getAllProducts();
}

changeTab() {
      this.route.queryParams.subscribe(val => {
        const i = this.category.findIndex(aa => aa.key === val['category']);
        if (i > -1) {
          this.selectedtab = i;
        }
        console.log(this.selectedtab);
      });
  }

  fetchCategory() {
    this.categoryService
      .getcategory()
      .subscribe((data) => {
        this.category = data['category'];
        data['category'].sort((a, b) => parseFloat(a.source) - parseFloat(b.source));
        this.changeTab();
        // console.log('Data requested ...');
        // console.log(this.category);
      });
  }

  showToast(msg) {
    if (msg) {
      this.toastMsg = msg;
    } else {
      this.toastMsg = 'Added Successfully';
    }
    // Get the snackbar DIV
    const x = document.getElementById('snackbar');

    // Add the "show" class to DIV
    x.className = 'show';

    // After 3 seconds, remove the show class from DIV
    setTimeout(function() { x.className = x.className.replace('show', ''); }, 1000);
}

  createItem(pro): FormGroup {
    let defaultv = '';
    if (pro.qty_1 > 0) {
      defaultv = 'size_1';
    } else if (pro.qty_2 > 0) {
      defaultv = 'size_2';
    } else if (pro.qty_3 > 0) {
      defaultv = 'size_3';
    }
    return new FormGroup({
      size: new FormControl(defaultv)
    });
  }

  getAllProducts() {
    this.fetching = true;
    this.api.get(serviceUrl.productAll).subscribe((val: Array<any>) => {
      val.map(pro => {
        pro.form = this.createItem(pro);
      });
      this.products = val;
      this.fetching = false;
      this.products.sort((a, b) => {
        if (a.index < b.index) return -1;
        else if (a.index > b.index) return 1;
        else return 0;
      });
      // console.log(val); 
    });
  }

  get itemsCount() {
    return  this.cart.getNumberofItems();
   }

  addtoCart(pro, size) {
    if (this.cart.getNumberofItems() >= this.constservice.appConstants.constants.quantityLimit ) {
      this.cartlim(true);
    } else {
    const product = Object.assign({...pro});
    product.form = undefined;
    const isAdded = this.cart.addItem({product, size: size.size});
    if (isAdded) {
      this.showToast(null);
    } else {
      this.showToast(`Only ${product[`qty_${size.size.split('_')[1]}`]} Item/s Available`);
    }
  }
  }

  cartlim(bool) {
    $('#cartlimit').modal({show: bool});
  }

  get cartItems() {
    return this.cart.productList;
  }

  increment(item) {
    if (this.cart.getNumberofItems() >= 15) {
      this.cartlim(true);
    } else {
    this.cart.increment(item);
    }
  }

  decrement(item) {
    this.cart.decrement(item);
  }

  get getTotal() {
    return this.cart.subTotal();
  }

  get deliveryCharges() {
    return this.cart.calculateDelivery();
  }

  get loginStatus() {
    return this.loginService.loggedIn;
  }

  tabchange() {
    alert('sadas');
  }

}
