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



@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    CoreModule,
    FormsModule,
    HttpClientModule,
    StoreModule.forFeature(FeatureStates.security, securityReducer)
  ],
})
export class SecurityModule { }
