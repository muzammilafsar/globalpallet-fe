import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { CustomerContactService } from '../customer-contact.service';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
loading: Boolean = false;
createForm: FormGroup;

  constructor(private customercontactService: CustomerContactService, private fb: FormBuilder, private router: Router) {

    this.createForm = this.fb.group({
      Order_id: ['', Validators.required],
      subject: ['', Validators.required],
      name: ['', Validators.required],
      mobile: ['', Validators.required],
      comment: ['', Validators.required]
      });
   }

   addIssues(Order_id, subject, name, mobile, comment) {
    this.customercontactService.addIssues(Order_id, subject, name, mobile, comment).subscribe(() => {
      this.showToast();
      this.router.navigate(['/contact']);
      this.createForm.reset();
      console.log("Form Submitted!");
    });
  }

  ngOnInit() {
  //  function myMap() {
  //    var myCenter = new google.maps.LatLng(41.878114, -87.629798);
  //    var mapProp = {center: myCenter, zoom: 12, scrollwheel: false, draggable: false, mapTypeId: google.maps.MapTypeId.ROADMAP};
  //    var map = new google.maps.Map(document.getElementById('googleMap'), mapProp);
  //    var marker = new google.maps.Marker({position: myCenter});
  //    marker.setMap(map);
  //    }

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
