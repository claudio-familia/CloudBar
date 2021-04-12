import { Component, OnChanges, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/core/store/app.state';
import { SelectPlaceComponent } from 'src/app/features/security/components/select-place/select-place.component';
import { hasLogin } from 'src/app/features/security/state/security.selector';
import * as UserActions from '../../../security/state/actions/user.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnChanges {
  currentPlace$: any;

  constructor(private _store: Store<AppState>, private dialog: MatDialog) { }

  ngOnChanges(): void {
    this.validatePlace();    
  }

  validatePlace(){
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

}
