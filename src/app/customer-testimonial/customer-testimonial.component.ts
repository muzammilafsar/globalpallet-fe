import { Component, OnInit } from '@angular/core';
declare var $: any;
import * as $ from 'jquery';

@Component({
  selector: 'app-customer-testimonial',
  templateUrl: './customer-testimonial.component.html',
  styleUrls: ['./customer-testimonial.component.css']
})
export class CustomerTestimonialComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  slideConfig = {
    "slidesToShow": 1, 
    "slidesToScroll": 1, 
    "autoplay": true, 
    "arrows": false, 
    "autoplaySpeed": 2000, 
    // "fade": true,
    "initialSlide": 0,
    "mobileFirst": true,
    "dots": true,
    "infinite": true,
    // "adaptiveHeight": true,
    "centerMode" : true,
    // "accessibility": true,
    "responsive": [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]};

}
