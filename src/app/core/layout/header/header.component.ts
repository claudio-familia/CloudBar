import { Component, OnInit } from '@angular/core';
import settings from '../../../../appsettings.json';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  logo: string = settings.navbarLogo;

  ngOnInit(): void {
  }

}
