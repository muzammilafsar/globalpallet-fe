import { Component, OnInit, Input } from '@angular/core';
import { a } from '@angular/core/src/render3';

@Component({
  selector: 'app-address-card',
  templateUrl: './address-card.component.html',
  styleUrls: ['./address-card.component.css']
})
export class AddressCardComponent implements OnInit {
  @Input('address') address;
  @Input('actions') actions;
  @Input('selected') selected: Boolean = true;

  constructor() { }

  ngOnInit() {
  }

}
