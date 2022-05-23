import { AfterViewInit, Component, DoCheck, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { AppState } from './core/store/app.state';
import { SelectPlaceComponent } from './features/security/components/select-place/select-place.component';
import { AuthService } from './features/security/services/auth.service';
import { getCurrentPlace, hasLogin } from './features/security/state/security.selector';
import * as UserActions from './features/security/state/actions/user.actions';
import { getIsLoading } from './core/store/state/app.selector';
import { delay } from 'rxjs/operators';

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
  
  constructor(private _store: Store<AppState>, 
              private _authService: AuthService,
              public dialog: MatDialog) { 
    this.hasLoggin = this._authService.validateToken();
    this.currentPlace$ = _store.pipe(select(getCurrentPlace));
    this.isLoading$ = _store.pipe(select(getIsLoading));
  }

  ngOnInit(): void {
    this.isLoading$.pipe(delay(0)).subscribe(
      res => this.isLoading = res
    );
    const currentPlace = JSON.parse(localStorage.getItem('app-current-place'));
    if(currentPlace){
      this._store.dispatch(UserActions.setCurrentPlace({currentPlace: currentPlace}));
    }else{
      this.currentPlace$.subscribe(
        res => {
          if(!res && this.hasLoggin){
            this.dialog.open(SelectPlaceComponent, <MatDialogConfig>{width: '500px', disableClose: false});
          }
        }
      )
    }
  }

  title = 'cloudbar';
  hasLoggin: Boolean = true;
  
}
