import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/core/services/base.service';
import { environment } from 'src/environments/environment';
import { Item } from '../models/item';

@Injectable({
  providedIn: 'root'
})
export class ItemService extends BaseService<Item> {
  constructor(public httpClient: HttpClient) {
    super(environment.urls.item, httpClient);    
  }

  getByCriteria(searchCriteria: string) {
    return this.httpClient.get<Item[]>(`${this._apiUrl}/search/${searchCriteria}`, {headers: this._headers});
  }
}
