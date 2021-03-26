import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import GENERAL_ROUTES from './routes/general.routes';
import SECURITY_ROUTES from './routes/security.routes';

const routes: Routes = [
  ...GENERAL_ROUTES,
  ...SECURITY_ROUTES,
  {path:'**', redirectTo:'home'}
];

console.log(routes)

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
