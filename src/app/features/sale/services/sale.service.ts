import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/core/services/base.service';
import { environment } from 'src/environments/environment';
import { SaleOrder } from '../models/sale';

@Injectable({
  providedIn: 'root'
})
export class SaleOrderService extends BaseService<SaleOrder> {  
  constructor(public httpClient: HttpClient) {
    super(environment.urls.sale, httpClient);
  }
}
