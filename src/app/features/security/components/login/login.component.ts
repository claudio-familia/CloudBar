import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/core/store/app.state';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from '../../services/auth.service';
import * as userActions from '../../state/actions/user.actions';

@Component({
    selector: 'app-login',	
    templateUrl: `login.component.html`,
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    hidePassword:boolean = true;
    username: string;
    password: string;
    errorTitle: string = 'Error al validar';

    constructor(private _authService: AuthService, 
                private _alertService: AlertService,
                private _router: Router,
                private _store: Store<AppState>) {
    }
    
    login(){        
        const response = this._authService.signIn(this.username, this.password);
        response.subscribe(
            res => {
                localStorage.setItem('api-token', res.token);
                localStorage.setItem('app-user', res.username);

                this._store.dispatch(userActions.setCurrentUser({currentUser: res}));
                this._store.dispatch(userActions.setWheterHasLoggedIn({isLoggedIn: true}));

                this._router.navigate(['/home']);
            },
            error => {                
                switch(error.status){
                    case 401: 
                        this._alertService.ToasterNotification(this.errorTitle, 'Usuario o contraseña invalida', 'error');
                    break;
                    case 404:
                        this._alertService.ToasterNotification(this.errorTitle, 'Este usuario no existe', 'error');
                    break;                    
                    default:
                        this._alertService.ToasterNotification(this.errorTitle, 'Ha ocurrido un error en el servicio', 'error');
                }
            }
        );
    }    
}