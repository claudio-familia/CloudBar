import { AfterViewInit, Component, DoCheck, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { AppState } from './core/store/app.state';
import { SelectPlaceComponent } from './features/security/components/select-place/select-place.component';
import { AuthenticationService } from './features/security/services/authentication.service';
import { getCurrentPlace, hasLogin } from './features/security/state/security.selector';
import { checkAuth } from './features/security/state/actions/auth0.actions';
import * as UserActions from './features/security/state/actions/user.actions';
import { getIsLoading } from './core/store/state/app.selector';
import { delay } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['../assets/scss/main.scss'],
  styles: ['div { height: 100%; } .passive { background-color: white; opacity: 0.7 }']
})
export class AppComponent implements OnInit {
  currentPlace$: any;
  isLoading$: any;
  isLoading: boolean = false;
  loggedIn$: Observable<boolean>;  
  
  constructor(private _store: Store<any>, 
              private _authService: AuthenticationService,
              public dialog: MatDialog) {     
    this.currentPlace$ = _store.pipe(select(getCurrentPlace));
    this.isLoading$ = _store.pipe(select(getIsLoading));
  }

  ngOnInit(): void {
    this.isLoading$.pipe(delay(0)).subscribe(
      res => this.isLoading = res
    );

    this.loggedIn$ = this._store.pipe(select(hasLogin));
    this._store.dispatch(checkAuth());

    const currentPlace = JSON.parse(localStorage.getItem('app-current-place'));
    if(currentPlace){
      this._store.dispatch(UserActions.setCurrentPlace({currentPlace: currentPlace}));
    }else{
      this.currentPlace$.subscribe(
        res => {
          if(!res){
            this.dialog.open(SelectPlaceComponent, <MatDialogConfig>{width: '500px', disableClose: false});
          }
        }
      )
    }
  }

  title = 'cloudbar';
  hasLoggin: Boolean = true;
  
}
