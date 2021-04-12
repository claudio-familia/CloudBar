import { Component, OnChanges, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { AppState } from './core/store/app.state';
import { SelectPlaceComponent } from './features/security/components/select-place/select-place.component';
import { AuthService } from './features/security/services/auth.service';
import { getCurrentPlace, hasLogin } from './features/security/state/security.selector';
import * as UserActions from './features/security/state/actions/user.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['../assets/scss/main.scss'],
  styles: ['div { height: 100%; }']
})
export class AppComponent implements OnInit {
  currentPlace$: any;
  
  constructor(private _store: Store<AppState>, 
              private _authService: AuthService,
              public dialog: MatDialog) { 
    this.hasLoggin = this._authService.validateToken();
    this.currentPlace$ = _store.pipe(select(getCurrentPlace));
  }
  ngOnInit(): void {
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
