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
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter
      }
    }),
    StoreModule.forRoot({}),
    StoreDevtoolsModule.instrument()
  ],
  providers: [HttpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function tokenGetter() {
  return localStorage.getItem('api-token');
}