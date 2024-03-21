import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { PartyorderService } from '../partyorder.service';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-partyorders',
  templateUrl: './partyorders.component.html',
  styleUrls: ['./partyorders.component.css']
})
export class PartyordersComponent implements OnInit {
  
  loading: Boolean = false;
  createForm: FormGroup;

  constructor(private partyorderService: PartyorderService, private fb: FormBuilder, private router: Router) { 
    this.createForm = this.fb.group({
      event_name: ['', Validators.required],
      amount_people: ['', Validators.required],
      date: ['', Validators.required],
      name: ['', Validators.required],
      mobile: ['', Validators.required],
      comment: ['', Validators.required]
      });
   }
   
   addPartyOrders(event_name, amount_people, date, name, mobile, comment) {
    this.partyorderService.addPartyOrders(event_name, amount_people, date, name, mobile, comment).subscribe(() => {
      this.showToast();
      this.router.navigate(['/partyorders']);
      this.createForm.reset();
      console.log("Form Submitted!");
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

  ngOnInit() {
  }

}
