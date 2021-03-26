import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot
} from '@angular/router';
import { Observable, zip } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/core/store/app.state';
import { hasLogin } from 'src/app/features/security/state/security.selector';
import { AuthService } from 'src/app/features/security/services/auth.service';

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
    ): Observable<boolean> {
        const loggedInObservable = this.store.pipe(select(hasLogin));
        return zip(loggedInObservable)
            .pipe(
                tap(async ([hasLogin]) => {
                    const response = await this.authService.validate().toPromise().then(_ => { return true; });
                    hasLogin = response ? true : hasLogin;
                    if (!response && !hasLogin) {
                        this.router.navigate(['login']);
                    }
                }),
                map(([hasLogin]) => {
                    return hasLogin;
                })
            );
    }
}

