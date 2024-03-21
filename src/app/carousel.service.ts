import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class CarouselService {

  constructor(private api: ApiService) { }

  getCarousels() {
    return this.api.get(`/get_all_carousel`);
  }

}
