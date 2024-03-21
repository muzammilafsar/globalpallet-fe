import { Component, OnInit } from '@angular/core';
import { ExploreService } from '../explore.service';
declare var $: any;
import * as $ from 'jquery';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css']
})
export class ExploreComponent implements OnInit {

  explore = [];
  loading = true;

  constructor(private exp: ExploreService) { }

  ngOnInit() {
    this.getExplore();
  }

  // slideConfig = {
  //   "autoplay": true, 
  //   "arrows": false, 
  //   "autoplaySpeed": 3000, 
  //   "mobileFirst": true,
  //   "dots": true,
  //   slidesToShow: 4,
  //   slidesToScroll: 1,
  //   lazyLoad: 'ondemand',
  //   responsive: [
  //     {
  //       breakpoint: 1024,
  //       settings: {
  //         slidesToShow: 3,
  //         slidesToScroll: 3,
  //         infinite: true,
  //         dots: true
  //       }
  //     },
  //     {
  //       breakpoint: 600,
  //       settings: {
  //         slidesToShow: 2,
  //         slidesToScroll: 2
  //       }
  //     },
  //     {
  //       breakpoint: 480,
  //       settings: {
  //         slidesToShow: 1,
  //         slidesToScroll: 1
  //       }
  //     }
  //   ]};

  getExplore() {
    this.exp.getExplore().subscribe((data: any) => {
     this.explore = data;
     this.loading = false;
    });
  }



}
