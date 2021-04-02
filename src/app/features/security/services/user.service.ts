import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/core/services/base.service';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService<User> {  
  constructor(public httpClient: HttpClient) {
    super(environment.urls.parameter, httpClient);
  }
}
