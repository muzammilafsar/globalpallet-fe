import { Component, OnInit, Input, AfterViewInit, OnDestroy } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-not-available',
  templateUrl: './not-available.component.html',
  styleUrls: ['./not-available.component.css']
})
export class NotAvailableComponent implements AfterViewInit, OnDestroy {
  
  @Input() open: Boolean = false;

  constructor() { }

  ngAfterViewInit() {
    this.openNotNow();
  }

  ngOnDestroy() {
    $('#exampleModal').modal('hide');
  }

  openNotNow() {
    // $('#exampleModal').modal('show')
    $('#exampleModal').modal({show: true, keyboard: false, backdrop: 'static'});
  }

}
