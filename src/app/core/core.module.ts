import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout/layout.component';
import { HeaderComponent } from './layout/header/header.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { UserInfoComponent } from './layout/header/user-info/user-info.component';
import { ToastrModule } from 'ngx-toastr';
import { MatSelectFilterModule } from 'mat-select-filter';
import { MaterialModule } from './material-design/material.module';
import { RouterModule } from '@angular/router';
import { LoginLayoutComponent } from './layout/login-layout/login-layout.component';



@NgModule({
  declarations: [
    LayoutComponent, 
    HeaderComponent, 
    SidebarComponent,
    UserInfoComponent,
    LoginLayoutComponent
  ],
  exports: [LayoutComponent, MaterialModule, LoginLayoutComponent],
  imports: [
    CommonModule,
    MaterialModule,
    MatSelectFilterModule,
    RouterModule,
    ToastrModule.forRoot({
      progressBar: true,
      progressAnimation: 'increasing',
      enableHtml: true
    })
  ]
})
export class CoreModule { }
