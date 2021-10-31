import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import settings from '../../../../../appsettings.json';
import { SecurityState } from '../../state/security.state';
import * as securityActions from '../../state/actions/auth0.actions';
import { hasLogin } from '../../state/security.selector';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: `login.component.html`,
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    logo: string = settings.loginLogo;

    constructor(private _store: Store<SecurityState>, private router: Router) {
    }

    ngOnInit(): void {
        this._store.select(hasLogin).subscribe(
            res => { 
                if(res) this.router.navigateByUrl('/home')
            }
        );
    }

    login() {
        this._store.dispatch(securityActions.login());
    }
}