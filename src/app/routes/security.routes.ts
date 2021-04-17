import { Routes } from "@angular/router";
import { LoginComponent } from "../features/security/components/login/login.component";
import { RoleFormComponent } from "../features/security/components/roles/form/role.form.component";
import { RoleComponent } from "../features/security/components/roles/role.component";
import { UserFormComponent } from "../features/security/components/users/form/user.form.component";
import { UserComponent } from "../features/security/components/users/user.component";
import { AuthGuard } from "./guards/auth.guard";
import { PlaceGuard } from "./guards/place.guard";

const SECURITY_ROUTES :Routes = [
    { path: 'login', component: LoginComponent },
    
    { path: 'users', component: UserComponent, canActivate: [AuthGuard] },
    { path: 'users/create', component: UserFormComponent, canActivate: [AuthGuard] },
    { path: 'users/edit/:id', component: UserFormComponent, canActivate: [AuthGuard] },

    { path: 'roles', component: RoleComponent, canActivate: [AuthGuard] },
    { path: 'roles/create', component: RoleFormComponent, canActivate: [AuthGuard] },
    { path: 'roles/edit/:id', component: RoleFormComponent, canActivate: [AuthGuard] },
]

export default SECURITY_ROUTES;