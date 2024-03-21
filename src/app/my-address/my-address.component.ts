import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { serviceUrl } from '../app.constants';
import {LocalityService} from '../locality.service';
import { AddressService } from '../address.service';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';

declare var $: any;

@Component({
  selector: 'app-my-address',
  templateUrl: './my-address.component.html',
  styleUrls: ['./my-address.component.css']
})
export class MyAddressComponent implements OnInit {

  createForm: FormGroup;
  useraddress: any[];
  loading: Boolean = false;
  editForm: Boolean = false;
  fetchedAddress;
  localities: any[];

  constructor(
    private localityService: LocalityService,
    private addressService: AddressService,
    private fb: FormBuilder,
    private router: Router) 
  
  {
    this.createForm = new FormGroup({
      title: new FormControl('', Validators.required),
      first_name: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      address2: new FormControl('', Validators.required),
      pincode: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      locality: new FormControl('', Validators.required)
    });
  }
  
  setEditMode(bool) {
    this.editForm = bool;
  }
  addAddress() {
    // tslint:disable-next-line:max-line-length
    // console.log(this.createForm.valid); 
    if (this.createForm.valid) {
      this.addressService.addAddress(this.createForm.value).subscribe(val => {
        this.getAddress();
        this.showToast();
      }, (err) => {
        this.getAddress();
        this.showToast();
      });
    }
  }

  fetchLocality() {
    this.localityService.getLocality().subscribe(
      (data: any[]) => { 
        this.localities = data;
        // console.log(this.localities); 
      });
  }

  ngOnInit() {
    this.fetchLocality();
    this.getAddress();
  }


  getAddress() {
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
  editAddress(id) {
    // console.log(id); 
    this.editForm = true;
    this.loading = true;
    if (id) {
      this.addressService.getAddress(id).subscribe(val => {
        this.loading = false;
        this.fetchedAddress = id;
        // console.log("bhai ye h", val['address']); 
        this.createForm.patchValue(val['address']);
        this.openModal(true);

      }, (err) => { this.loading = false; });

    }
  }
  editSave(id) {
    this.editForm = true;
    this.loading = true;
    this.addressService.editAddress(id,  this.createForm.value).subscribe(val => {
    this.loading = false;
      this.getAddress();
      this.resetForm();
      this.showToast();
      this.fetchedAddress = '';
    }, (err) => { this.getAddress();  this.showToast(); this.loading = false; });
  }
  save(data) {
    console.log(' added successfuly ');
  }
  openModal(bool) {
    $('#myModal').modal({show: bool, backdrop: 'static', keyboard: false });
  }
  resetForm() {
    this.createForm.reset();
  }
  deleteAddress(id) {
    this.loading = true;
    this.addressService.deleteAddress(id).subscribe(
      val => {
        this.loading = false;
        this.getAddress();
        this.showToast();
      },
      err => {
        this.loading = false;
        this.getAddress();
        this.showToast();
      }
    );
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
