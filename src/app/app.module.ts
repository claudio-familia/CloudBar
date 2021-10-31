import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { GeneralModule } from './features/general/general.module';
import { SecurityModule } from './features/security/security.module';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { WarehouseModule } from './features/warehouse/warehouse.module';
import { SaleModule } from './features/sale/sale.module';
import { HttpClientModule } from '@angular/common/http';
import { HttpInterceptorProviders } from './core/services/interceptors/http.interceptor';
import { AuthModule } from '@auth0/auth0-angular';
import { EffectsModule } from '@ngrx/effects';
import { SharedModule } from './features/shared/shared.module';

@NgModule({
  declarations: [
    AppComponent    
  ],
  imports: [    
    AppRoutingModule,    
    CoreModule,
    GeneralModule,
    SecurityModule,
    WarehouseModule,
    SaleModule,
    HttpClientModule,
    SharedModule,
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