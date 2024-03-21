import { Injectable } from '@angular/core';
import { ApiService } from './api.service';


@Injectable({
  providedIn: 'root'
})
export class ExploreService {

  constructor(private api: ApiService) { }

  getExplore() {
   return this.api.get('/explore');
  }
}
