import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { LoginModel } from '../models/login';

@Injectable({ providedIn: 'root' })
export class AuthService {    
    constructor(private http: HttpClient) {
    }

    signIn(username: string, password: string): Observable<LoginModel> {
        const user = { Username: username, Password: password };        
        return this.http.post<LoginModel>(`${environment.ApiUrl}/auth/login`, user);
    }

    signOut() {
        localStorage.removeItem('api-token')
        localStorage.removeItem('app-user')
    }

    validate() {
        const token = localStorage.getItem('api-token');
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.post(`${environment.ApiUrl}/auth/validate`, {}, {headers: headers});
    }
}