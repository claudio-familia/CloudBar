import { Routes } from "@angular/router";
import { HomeComponent } from "../features/general/components/home/home.component";
import { PeopleFormComponent } from "../features/general/components/people/form/people.form.component";
import { PeopleComponent } from "../features/general/components/people/people.component";
import { AuthGuard } from "./guards/auth.guard";

const GENERAL_ROUTES :Routes = [
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'people', component: PeopleComponent, canActivate: [AuthGuard] },
    { path: 'people/create', component: PeopleFormComponent, canActivate: [AuthGuard] },
    { path: 'people/edit/:id', component: PeopleFormComponent, canActivate: [AuthGuard] },
    { path: 'people/view/:id', component: PeopleFormComponent, canActivate: [AuthGuard] },
]

export default GENERAL_ROUTES;