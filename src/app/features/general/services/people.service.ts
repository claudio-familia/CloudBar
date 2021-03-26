import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/services/base.service';
import { config } from 'src/environments/environment';
import { Person } from '../models/person';

@Injectable({
  providedIn: 'root'
})
export class PeopleService extends BaseService<Person> {  
  constructor(public httpClient: HttpClient) {
    super(config.urls.person, httpClient);    
  }
}
