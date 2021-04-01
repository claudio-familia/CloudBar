import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { LoginModel } from '../models/login';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {    
    constructor(private http: HttpClient, 
                private jwtHelper: JwtHelperService) {
    }

    signIn(username: string, password: string): Observable<LoginModel> {
        const user = { Username: username, Password: password };        
        return this.http.post<LoginModel>(`${environment.ApiUrl}/auth/login`, user);
    }

    signOut() {
        console.log('getting out')
        localStorage.removeItem('api-token');
        localStorage.removeItem('app-user');
        window.location.href = '/login'        
    }

    validateToken(): Boolean {
        const token = localStorage.getItem('api-token');
        return !this.jwtHelper.isTokenExpired(token);
    }
}