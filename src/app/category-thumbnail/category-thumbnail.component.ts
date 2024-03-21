import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../category.service';
import {Router} from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-category-thumbnail',
  templateUrl: './category-thumbnail.component.html',
  styleUrls: ['./category-thumbnail.component.css']
})
export class CategoryThumbnailComponent implements OnInit {

  category: Array<any> = [];
  loading: Boolean = false;

  constructor(private categoryService: CategoryService, private router: Router) { }

  ngOnInit() {
    this.fetchCategory();
  }

  fetchCategory() {
    this.loading = true;
    this.categoryService
      .getcategory()
      .subscribe((data) => {
        this.category = data['category'];
        data['category'].sort((a, b) => parseFloat(a.source) - parseFloat(b.source));
        this.loading = false;
      });
  }



}
