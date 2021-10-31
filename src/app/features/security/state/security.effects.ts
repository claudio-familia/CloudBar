import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { combineLatest, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';
import * as authActions from './actions/auth0.actions';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthenticationService
  ) {}

  login$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authActions.login),
        tap(() => this.authService.login())
      ),
    { dispatch: false }
  );

  checkAuth$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.checkAuth),
      switchMap(() =>
        combineLatest([this.authService.isLoggedIn$, this.authService.user$])
      ),
      switchMap(([isLoggedIn, profile]) => {
        if (isLoggedIn) {
          return of(authActions.loginComplete({ profile, isLoggedIn }));
        }

        return of(authActions.logoutComplete());
      })
    )
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.logout),
      tap(() => this.authService.logout()),
      switchMap(() => of(authActions.logoutComplete()))
    )
  );
}