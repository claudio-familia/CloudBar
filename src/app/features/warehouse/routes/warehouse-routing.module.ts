import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import WAREHOUSE_ROUTES from './warehouse.routes';


@NgModule({
  imports: [RouterModule.forChild(WAREHOUSE_ROUTES)],
  exports: [RouterModule]
})
export class WarehouseRoutingModule { }
