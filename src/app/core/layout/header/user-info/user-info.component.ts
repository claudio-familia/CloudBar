import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/core/store/app.state';
import { SelectPlaceComponent } from 'src/app/features/security/components/select-place/select-place.component';
import { AuthService } from 'src/app/features/security/services/auth.service';
import { getCurrentPlace, getCurrentUser } from 'src/app/features/security/state/security.selector';

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

  constructor(private _authService: AuthService, private _store: Store<AppState>, public dialog: MatDialog) { 
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
    this._authService.signOut();
  }

  changePlace(){
    this.dialog.open(SelectPlaceComponent, <MatDialogConfig>{width: '500px', disableClose: false});
  }

}
