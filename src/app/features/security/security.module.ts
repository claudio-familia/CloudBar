import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { CoreModule } from 'src/app/core/core.module';
import { MaterialModule } from 'src/app/core/material-design/material.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { FeatureStates } from 'src/app/core/store/app.constant';
import { securityReducer } from './state/security.reducer';
import { JwtModule } from '@auth0/angular-jwt'
import { UserComponent } from './components/users/user.component';
import { UserFormComponent } from './components/users/form/user.form.component';
import { RoleComponent } from './components/roles/role.component';
import { RoleFormComponent } from './components/roles/form/role.form.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { SelectPlaceComponent } from './components/select-place/select-place.component';
import { ChangeAppInfoComponent } from './components/change-app-info/change-app-info.component';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './state/security.effects';



@NgModule({
  declarations: [
    LoginComponent,
    UserComponent,
    UserFormComponent,
    RoleComponent,
    RoleFormComponent,
    SelectPlaceComponent,
    ChangeAppInfoComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    SharedModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    JwtModule,
    StoreModule.forFeature(FeatureStates.security, securityReducer),
    EffectsModule.forFeature([AuthEffects])
  ],
  exports: [
    JwtModule
  ]
})
export class SecurityModule { }
