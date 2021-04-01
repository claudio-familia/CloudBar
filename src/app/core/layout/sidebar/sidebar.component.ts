import { Component, OnInit } from '@angular/core';
import { MenuItem, MENU, SETTINGMENU } from '../../models/menu-item';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor() { }

  menuItems: MenuItem[] = [];
  settingMenuItems: MenuItem[] = [];

  isSettingsOpen: Boolean = false;
  iconSettings: string = 'arrow_forward_ios'

  ngOnInit(): void {
    this.menuItems = MENU;
    this.settingMenuItems = SETTINGMENU;
  }

  openSubMenu(){
    this.isSettingsOpen = !this.isSettingsOpen;

    if(this.isSettingsOpen) this.iconSettings = 'keyboard_arrow_down'
    else this.iconSettings = 'arrow_forward_ios'    
  }

}
