import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/core/services/base.service';
import { environment } from 'src/environments/environment';
import { Parameter } from '../models/parameter';

@Injectable({
  providedIn: 'root'
})
export class ParameterService extends BaseService<Parameter> {  
  constructor(public httpClient: HttpClient) {
    super(environment.urls.parameter, httpClient);
  }
}
