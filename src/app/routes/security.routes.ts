import { Routes } from "@angular/router";
import { LoginComponent } from "../features/security/components/login/login.component";

const SECURITY_ROUTES :Routes = [
    { path: 'login', component: LoginComponent }
]

export default SECURITY_ROUTES;