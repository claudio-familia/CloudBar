import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import GENERAL_ROUTES from './routes/general.routes';

const routes: Routes = [
  ...GENERAL_ROUTES
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
