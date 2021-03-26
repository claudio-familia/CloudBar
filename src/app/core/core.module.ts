import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout/layout.component';
import { HeaderComponent } from './layout/header/header.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { UserInfoComponent } from './layout/header/user-info/user-info.component';
import { ToastrModule } from 'ngx-toastr';
import { MatSelectFilterModule } from 'mat-select-filter';
import { MaterialModule } from './material-design/material.module';



@NgModule({
  declarations: [
    LayoutComponent, 
    HeaderComponent, 
    SidebarComponent,
    UserInfoComponent
  ],
  exports: [LayoutComponent, MaterialModule],
  imports: [
    CommonModule,
    MaterialModule,
    MatSelectFilterModule,
    ToastrModule.forRoot({
      progressBar: true,
      progressAnimation: 'increasing',
      enableHtml: true
    })
  ]
})
export class CoreModule { }
