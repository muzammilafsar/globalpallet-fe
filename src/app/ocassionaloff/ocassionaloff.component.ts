import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ShopService } from '../shop.service';
declare var $: any;

@Component({
  selector: 'app-ocassionaloff',
  templateUrl: './ocassionaloff.component.html',
  styleUrls: ['./ocassionaloff.component.css']
})
export class OcassionaloffComponent implements OnInit {

  constructor(private api: ApiService, private shop: ShopService) { }

  errorMsg = '';
  error = false;

  ngOnInit() {
    // this.getOcassional(); 
  }

  // getOcassional() {
  //     this.shop.getOcassional().subscribe(val => {
  //       if (val['status'] === 200) {
  //         this.error = false;
  //       } else {
  //         this.error = true;
  //         this.errorMsg = val['message'];
  //         this.openModal();
  //       }

  //     });
  //   }

  //   openModal() {
  //     $('#occError').modal({
  //       backdrop: 'static',
  //       keyboard: false,
  //       show: true
  //     });
  //   }

}
