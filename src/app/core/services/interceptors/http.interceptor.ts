import { Injectable } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {
    HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable()
export class NoopInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler):
        Observable<HttpEvent<any>> {
        console.log('got triggered')
        return next.handle(req);
    }
}

export const HttpInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: NoopInterceptor, multi: true },
];