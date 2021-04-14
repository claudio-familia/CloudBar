import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from 'src/app/core/services/base.service';
import { environment } from 'src/environments/environment';
import { Invoice } from '../models/invoice';
import { SaleOrder, SaleOrderLine } from '../models/sale';

@Injectable({
  providedIn: 'root'
})
export class SaleOrderService extends BaseService<SaleOrder> {

  constructor(public httpClient: HttpClient) {
    super(environment.urls.sale, httpClient);
  }

  updateProductFromOrder(data: SaleOrderLine): Observable<SaleOrderLine> {
    return this.httpClient.put<SaleOrderLine>(`${this._apiUrl}/lines`, data, { headers: this._headers });
  }

  addProductToOrder(data: SaleOrderLine): Observable<SaleOrderLine> {
    return this.httpClient.post<SaleOrderLine>(`${this._apiUrl}/lines`, data, { headers: this._headers });
  }

  createInvoice(data: Invoice): Observable<Invoice> {
    return this.httpClient.post<Invoice>(`${this._apiUrl}/invoice`, data, { headers: this._headers });
  }
}
