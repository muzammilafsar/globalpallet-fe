import { Injectable } from '@angular/core';
import {ApiService} from './api.service';

@Injectable({
  providedIn: 'root'
})
export class LocalityService {

  constructor(private api: ApiService) { }
  
getLocality () {
  return this.api.get('/locality');
}

}
