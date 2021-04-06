import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import GENERAL_ROUTES from './routes/general.routes';
import SALE_ROUTES from './routes/sale.routes';
import SECURITY_ROUTES from './routes/security.routes';
import WAREHOUSE_ROUTES from './routes/warehouse.routes';

const routes: Routes = [
  ...GENERAL_ROUTES,
  ...SECURITY_ROUTES,
  ...WAREHOUSE_ROUTES,
  ...SALE_ROUTES,
  {path:'**', redirectTo:'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
