import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { LoginModel } from '../models/login';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    constructor(private _auth0Service: AuthService) {
    }

    get isLoggedIn$(): Observable<boolean> {
        return this._auth0Service.isAuthenticated$;
    }

    getToken$(): Observable<string> {
        return this._auth0Service.getAccessTokenSilently();
    }

    get user$(): Observable<any> {
        return this._auth0Service.user$;
    }

    login(): void {
        this._auth0Service.loginWithRedirect();
    }

    logout(): void {
        this._auth0Service.logout({ returnTo: document.location.origin });
    }
}