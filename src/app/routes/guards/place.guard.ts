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
import { getCurrentPlace, hasLogin } from 'src/app/features/security/state/security.selector';
import * as userActions from 'src/app/features/security/state/actions/user.actions';
import { LoginModel } from 'src/app/features/security/models/login';

@Injectable({
    providedIn: 'root'
})
export class PlaceGuard implements CanActivate {
    constructor(
        private store: Store<AppState>,
        private router: Router
    ) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> {
        const placeSelector = this.store.select(getCurrentPlace);
        return placeSelector.pipe(
            map(currentPlace => {
                return true;
                // if (currentPlace) {
                //     return true;
                // }else{                    
                //     window.location.href = '/home'
                // }
            })
        );
    }
}
