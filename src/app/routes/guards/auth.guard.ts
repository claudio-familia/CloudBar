import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot,
    UrlTree
} from '@angular/router';
import { Observable, of, zip } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/core/store/app.state';
import { hasLogin } from 'src/app/features/security/state/security.selector';
import * as userActions from 'src/app/features/security/state/actions/user.actions';
import { AuthService } from 'src/app/features/security/services/auth.service';
import { LoginModel } from 'src/app/features/security/models/login';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(
        private store: Store<AppState>,
        private router: Router,
        private authService: AuthService
    ) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> {
        const logginSelector = this.store.select(hasLogin);
        return logginSelector.pipe(
            map(loggedIn => {
                if (loggedIn) {
                    return true;
                } else if (this.authService.validateToken()) {
                    const currentUser: LoginModel = {
                        username: localStorage.getItem('app-user'),
                        token: localStorage.getItem('api-token')
                    }

                    this.store.dispatch(userActions.setCurrentUser({ currentUser: currentUser }));
                    this.store.dispatch(userActions.setWheterHasLoggedIn({ isLoggedIn: true }));
                }else{
                    return this.router.parseUrl('/login')
                }
            })
        );
    }
}
