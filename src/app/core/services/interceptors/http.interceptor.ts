import { Injectable } from '@angular/core';
import { HttpResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import {
    HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AppState } from '../../store/app.state';
import { Store } from '@ngrx/store';
import * as AppActions from '../../store/state/app.action';

@Injectable()
export class NoopInterceptor implements HttpInterceptor {

    constructor(private _store: Store<AppState>){
    }

    intercept(req: HttpRequest<any>, next: HttpHandler):
        Observable<HttpEvent<any>> {
        this._store.dispatch(AppActions.setLoadingState({isLoading: true}));
        return next.handle(req).pipe(
            finalize(() => {
                this._store.dispatch(AppActions.setLoadingState({isLoading: false}));
            })
          );;
    }
}

export const HttpInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: NoopInterceptor, multi: true },
];