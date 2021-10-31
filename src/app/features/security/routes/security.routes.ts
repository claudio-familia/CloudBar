import { Routes } from "@angular/router";
import { LoginComponent } from "../components/login/login.component";
import { RoleFormComponent } from "../components/roles/form/role.form.component";
import { RoleComponent } from "../components/roles/role.component";
import { UserFormComponent } from "../components/users/form/user.form.component";
import { UserComponent } from "../components/users/user.component";
import { AuthGuard } from "../../../routes/guards/auth.guard";
import { PlaceGuard } from "../../../routes/guards/place.guard";

const SECURITY_ROUTES :Routes = [
    { path: 'dashboard', component: LoginComponent },
    
    { path: 'users', component: UserComponent, canActivate: [AuthGuard] },
    { path: 'users/create', component: UserFormComponent, canActivate: [AuthGuard] },
    { path: 'users/edit/:id', component: UserFormComponent, canActivate: [AuthGuard] },

    { path: 'roles', component: RoleComponent, canActivate: [AuthGuard] },
    { path: 'roles/create', component: RoleFormComponent, canActivate: [AuthGuard] },
    { path: 'roles/edit/:id', component: RoleFormComponent, canActivate: [AuthGuard] },
]

export default SECURITY_ROUTES;