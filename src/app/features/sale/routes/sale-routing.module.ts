import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import SALE_ROUTES from './sale.routes';


@NgModule({
  imports: [RouterModule.forChild(SALE_ROUTES)],
  exports: [RouterModule]
})
export class SalesRoutingModule { }
