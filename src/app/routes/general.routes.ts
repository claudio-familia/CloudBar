import { Routes } from "@angular/router";
import { HomeComponent } from "../features/general/components/home/home.component";
import { AuthGuard } from "./guards/auth.guard";

const GENERAL_ROUTES :Routes = [
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] }
]

export default GENERAL_ROUTES;