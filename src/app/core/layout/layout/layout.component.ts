import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { hasLogin } from 'src/app/features/security/state/security.selector';
import { AppState } from '../../store/app.state';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  constructor(private _store: Store<AppState>) { }

  hasLoggin: Boolean = true;

  ngOnInit(): void {
    this._store.pipe(select(hasLogin)).subscribe(
      res => {
        if(!res) this.hasLoggin = false;
        else this.hasLoggin = true;
      }
    )
  }

}
