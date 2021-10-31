import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import SECURITY_ROUTES from './security.routes';


@NgModule({
  imports: [RouterModule.forChild(SECURITY_ROUTES)],
  exports: [RouterModule]
})
export class SecurityRoutingModule { }
