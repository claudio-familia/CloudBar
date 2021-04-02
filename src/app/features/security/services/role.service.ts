import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/core/services/base.service';
import { environment } from 'src/environments/environment';
import { Role } from '../models/role';

@Injectable({
  providedIn: 'root'
})
export class RoleService extends BaseService<Role> {  
  constructor(public httpClient: HttpClient) {
    super(environment.urls.role, httpClient);
  }
}
