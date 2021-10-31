import { Routes } from "@angular/router";
import { HomeComponent } from "../features/general/components/home/home.component";
import { AuthGuard } from "./guards/auth.guard";

const routes: Routes = [
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: '', loadChildren: () => import('../features/general/general.module').then(m => m.GeneralModule)},
    { path: '', loadChildren: () => import('../features/security/security.module').then(m => m.SecurityModule)},
    { path: 'warehouse', loadChildren: () => import('../features/warehouse/warehouse.module').then(m => m.WarehouseModule)},
    { path: 'sales', loadChildren: () => import('../features/sale/sale.module').then(m => m.SaleModule)},
    { path: '**', redirectTo: 'home' }
];

export default routes;