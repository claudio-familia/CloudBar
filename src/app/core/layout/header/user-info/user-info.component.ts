import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/core/store/app.state';
import { ChangeAppInfoComponent } from 'src/app/features/security/components/change-app-info/change-app-info.component';
import { SelectPlaceComponent } from 'src/app/features/security/components/select-place/select-place.component';
import { AuthenticationService } from 'src/app/features/security/services/authentication.service';
import { getCurrentPlace, getCurrentUser } from 'src/app/features/security/state/security.selector';
import { logout } from 'src/app/features/security/state/actions/auth0.actions';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {
  currentPlace$: any;
  currentUser$: any;
  place: any;
  user: any;

  constructor(private _authService: AuthenticationService, private _store: Store<AppState>, public dialog: MatDialog) { 
    this.currentPlace$ = this._store.pipe(select(getCurrentPlace));
    this.currentUser$ = this._store.pipe(select(getCurrentUser));
  }

  ngOnInit(): void {
    this.currentPlace$.subscribe(
      res => {
        this.place = res;
      }
    )
    this.currentUser$.subscribe(
      res => {
        this.user = res;
      }
    )
  }

  logout(){    
    this._store.dispatch(logout());
  }

  changePlace(){
    this.dialog.open(SelectPlaceComponent, <MatDialogConfig>{width: '500px', disableClose: false});
  }

  personalInformation(){
    this.dialog.open(ChangeAppInfoComponent, <MatDialogConfig>{width: '500px', disableClose: false});
  }

}
