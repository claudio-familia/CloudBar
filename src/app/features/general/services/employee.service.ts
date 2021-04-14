import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/core/services/base.service';
import { environment } from 'src/environments/environment';
import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService extends BaseService<Employee> {  
  constructor(public httpClient: HttpClient) {
    super(environment.urls.employee, httpClient);
  }
}
