import { Component, OnChanges, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/core/store/app.state';
import { SelectPlaceComponent } from 'src/app/features/security/components/select-place/select-place.component';
import { getCurrentPlace, getCurrentUser, hasLogin } from 'src/app/features/security/state/security.selector';
import * as UserActions from '../../../security/state/actions/user.actions';
import jwt_decode from 'jwt-decode'
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  currentUser$: any;
  roleId: any;
  menuItems: any[] = []

  constructor(private _store: Store<AppState>, 
              private _router: Router,
              private dialog: MatDialog) {
    this.currentUser$ = this._store.pipe(select(getCurrentUser));
    this.menuItems = [
      {
        title: 'Ordenar',
        img: '../../../../../assets/images/orders/cocktail-2.png'
      },
      {
        title: 'Historial',
        img: '../../../../../assets/images/orders/history.png'
      }
    ]
  }
  ngOnInit(): void {
    this.validateRole();
  }

  selectType(action: string){    
    if(action == 'Historial') this._router.navigate(['sale-orders']);
    else this._router.navigate(['sale-orders/new']);
  }

  private validateRole() {
    this.currentUser$.subscribe(
      res => {
        if (res) {
          const tokenData = jwt_decode(res.token);
          this.roleId = tokenData['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
        }
      }
    );
  }

}
