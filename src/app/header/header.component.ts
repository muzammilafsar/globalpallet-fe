import { Component, OnInit, ViewChild } from '@angular/core';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { LoginService } from '../login.service';
import { OcassionaloffComponent } from '../ocassionaloff/ocassionaloff.component';

import { ConnectionService } from 'ng-connection-service';
import { ConstantsService } from '../constants.service';
import { CustomerService } from '../customer.service';
import { FormGroup, FormBuilder, Validators } from '../../../node_modules/@angular/forms';
import { Router } from '../../../node_modules/@angular/router';
declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @ViewChild('sidenav') sidenav: SidenavComponent;
  // @ViewChild('ocassional') ocassional: OcassionaloffComponent; 

  status = 'ONLINE';
  isConnected = true;

  errorMsg = '';
  error = false;

  userdata = {};
  
  createForm: FormGroup;

  constructor(private loginService: LoginService, private connectionService: ConnectionService, private fb: FormBuilder, private ConstService: ConstantsService, private cusService: CustomerService, private router: Router) {
    this.connectionService.monitor().subscribe(isConnected => {
      this.isConnected = isConnected;
      if (this.isConnected) {
        this.status = "ONLINE";
      }
      else {
        this.status = "OFFLINE";
        this.cartlim(true);
      }
    });

    this.createForm = this.fb.group({
      name: [ '' , Validators.required],
      order: ['', Validators.required],
      overall: ['', Validators.required],
      behavior: ['', Validators.required],
      packaging: ['', Validators.required],
      timely: ['', Validators.required]
      });
   }

  // ocassionaloff() {
  //   this.ocassional.getOcassional();
  // }

  ngOnInit() {
    //  this.feeds(true); 
    if(this.loginStatus) {
      this.getCustomer();
    }
  }
  
  ngDoCheck() {
    // this.getupdatemsg(); 
  }

  sendFeedback(overall, behavior, packaging, timely) {
    this.cusService.sendFeedback(this.userdata['userData'].name , this.userdata['userData']['last_order'].order, this.createForm.value.overall, this.createForm.value.behavior, this.createForm.value.packaging, this.createForm.value.timely).subscribe(() => {
      // console.log("Feedback Form Submitted!", overall , behavior, packaging, timely); 
      this.createForm.reset();
      console.log("Feedback Form Submitted!");
    });
  }

// below code is for order completion feedback form
  getCustomer() {
    this.cusService.getCustomer().subscribe((data: any) => {
        this.userdata = data;
        if(this.userdata['userData']['last_order'].feedback) {
          this.feeds(true);
        } else {
          console.log("else feedback");
        }
        //  console.log(this.userdata['userData'].completed_orders); 
      });
  }

  cancelFeedback() {
    this.cusService.cancelFeedback().subscribe(() => {});
  }
  
 // localStorage.setItem("feedback", JSON.stringify(data));
// feedback() {
//   this.cusService.getCustomer().subscribe((data: any[]) => {
//     var feedbackdata = JSON.parse(localStorage.getItem("feedback"));
//     if(data['userData'].completed_orders > feedbackdata.userData.completed_orders) {
//       this.feeds(true);
//      }
//   });
// }

  feeds(bool) {
    $('#feedback').modal({show: bool,
         backdrop: 'static',
         keyboard: false
      });
  }

  // below code is for occassional service off through Constants
  getupdatemsg() {
    if(this.ConstService.messageConstants.constants.notice === '') {
      this.error = false;
      console.log('notice khali ara h',this.ConstService.messageConstants.constants.notice);
      } else {
        console.log('notice mei data ara h',this.ConstService.messageConstants.constants.notice); 
        this.error = true;
        this.errorMsg = this.ConstService.messageConstants.constants.notice.toString();
        this.message(true);
      }
  }

  message(bool) {
    $('#occError').modal({show: bool,
         backdrop: 'static',
         keyboard: false
      });
  }


  cartlim(bool) {
    $('#net').modal({show: bool});
  }

  openSidenav() {
    this.sidenav.openNav();
  }

  get loginStatus() {
    return this.loginService.loggedIn;
  }

  logout() {
    this.loginService.logout();
  }

}
