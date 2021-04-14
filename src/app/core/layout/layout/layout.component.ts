import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { LoginModel } from 'src/app/features/security/models/login';
import { User } from 'src/app/features/security/models/user';
import { getCurrentUser } from 'src/app/features/security/state/security.selector';
import { AppState } from '../../store/app.state';
import jwt_decode  from 'jwt-decode';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  
  currentUser$: any;
  roleId: string;

  constructor(private _store: Store<AppState>){
    this.currentUser$ = this._store.pipe(select(getCurrentUser))
  }

  ngOnInit(): void {
    this.currentUser$.subscribe(
      res => {
        if(res){
          const tokenData = jwt_decode(res.token);          
          this.roleId = tokenData['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
        }        
      }
    )
  }

}
