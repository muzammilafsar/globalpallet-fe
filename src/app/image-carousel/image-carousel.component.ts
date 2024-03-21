import { Component, OnInit } from '@angular/core';
import { CarouselService } from '../carousel.service';
import {Router} from '@angular/router';
declare var $: any;
import * as $ from 'jquery';

@Component({
  selector: 'app-image-carousel',
  templateUrl: './image-carousel.component.html',
  styleUrls: ['./image-carousel.component.css']
})
export class ImageCarouselComponent implements OnInit {

  carousels: Array<any> = [];
  loading: Boolean = false;

  constructor(private carouselService: CarouselService, private router: Router) { }

  ngOnInit() {
    this.fetchCarousels();
    // $('.slider').slick();
  }

  slideConfig = {
    "slidesToShow": 1, 
    "slidesToScroll": 1, 
    "autoplay": true, 
    "arrows": false, 
    "autoplaySpeed": 3000, 
    // "fade": true,
    "initialSlide": 0,
    "mobileFirst": true,
    "dots": true,
    "infinite": true,
    // "adaptiveHeight": true,
    "responsive": [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]};
  

  fetchCarousels() {
    this.loading = true;
    this.carouselService
      .getCarousels()
      .subscribe((data: Array<any> = []) => {
        this.carousels = data;
        this.loading = false;
      });
  }

}
