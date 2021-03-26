import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/features/shared/base/base.component';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent extends BaseComponent implements OnInit {

  constructor(private _alertService: AlertService) 
  { super(_alertService); }

  ngOnInit(): void {
  }

}
