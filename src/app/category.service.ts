import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private api: ApiService) { }
  getcategory() {
    return this.api.get(`/category`);
  }
  
  getCategoryById(id) {
    return this.api.get(`/category/${id}`);
  }
}
