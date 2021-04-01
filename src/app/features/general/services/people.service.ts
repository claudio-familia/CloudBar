import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/core/services/base.service';
import { environment } from 'src/environments/environment';
import { Person } from '../models/person';

@Injectable({
  providedIn: 'root'
})
export class PeopleService extends BaseService<Person> {  
  constructor(public httpClient: HttpClient) {
    super(environment.urls.person, httpClient);
  }
}
