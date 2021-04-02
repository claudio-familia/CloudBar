import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/core/services/base.service';
import { environment } from 'src/environments/environment';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends BaseService<Category> {  
  constructor(public httpClient: HttpClient) {
    super(environment.urls.category, httpClient);
  }
}
