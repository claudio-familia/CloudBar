import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from './core/store/app.state';
import { hasLogin } from './features/security/state/security.selector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['../assets/scss/main.scss']
})
export class AppComponent implements OnInit {
  
  constructor(private _store: Store<AppState>) { }

  title = 'cloudbar';
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
