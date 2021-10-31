import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { GeneralModule } from './features/general/general.module';
import { SecurityModule } from './features/security/security.module';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { JwtModule } from '@auth0/angular-jwt'
import { WarehouseModule } from './features/warehouse/warehouse.module';
import { SaleModule } from './features/sale/sale.module';
import { HttpClientModule } from '@angular/common/http';
import { HttpInterceptorProviders } from './core/services/interceptors/http.interceptor';
import { AuthModule } from '@auth0/auth0-angular';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [
    AppComponent    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule,
    GeneralModule,
    SecurityModule,
    WarehouseModule,
    SaleModule,
    HttpClientModule,
    AuthModule.forRoot({
      domain: 'dev-acddag2p.us.auth0.com',
      clientId: 'z6SRkmw3AGX4AftU0vSVJdezFdwzpBTV',
      redirectUri: window.location.origin,
    }),    
    StoreModule.forRoot({}),
    StoreDevtoolsModule.instrument(),
    EffectsModule.forRoot([])
  ],
  providers: [HttpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }