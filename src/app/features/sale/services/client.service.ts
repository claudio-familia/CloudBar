import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/core/services/base.service';
import { environment } from 'src/environments/environment';
import { Client } from '../models/client';

@Injectable({
  providedIn: 'root'
})
export class ClientService extends BaseService<Client> {  
  constructor(public httpClient: HttpClient) {
    super(environment.urls.client, httpClient);
  }
}
