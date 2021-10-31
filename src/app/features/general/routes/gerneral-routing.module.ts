import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import GENERAL_ROUTES from './general.routes'


@NgModule({
  imports: [RouterModule.forChild(GENERAL_ROUTES)],
  exports: [RouterModule]
})
export class GeneralRoutingModule { }
