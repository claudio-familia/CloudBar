import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/core/store/app.state';
import { hasLogin } from 'src/app/features/security/state/security.selector';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private _store: Store<AppState>) { }

  ngOnInit(): void {   
  }

}
