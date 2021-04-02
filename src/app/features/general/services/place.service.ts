import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/core/services/base.service';
import { environment } from 'src/environments/environment';
import { Parameter } from '../models/parameter';
import { Place } from '../models/place';

@Injectable({
  providedIn: 'root'
})
export class PlaceService extends BaseService<Place> {  
  constructor(public httpClient: HttpClient) {
    super(environment.urls.place, httpClient);
  }
}
