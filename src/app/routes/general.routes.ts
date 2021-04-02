import { Routes } from "@angular/router";
import { HomeComponent } from "../features/general/components/home/home.component";
import { ParameterFormComponent } from "../features/general/components/parameter/form/parameter.form.component";
import { ParameterComponent } from "../features/general/components/parameter/parameter.component";
import { PeopleFormComponent } from "../features/general/components/people/form/people.form.component";
import { PeopleComponent } from "../features/general/components/people/people.component";
import { PlaceFormComponent } from "../features/general/components/place/form/place.form.component";
import { PlaceComponent } from "../features/general/components/place/place.component";
import { AuthGuard } from "./guards/auth.guard";

const GENERAL_ROUTES :Routes = [
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    
    { path: 'people', component: PeopleComponent, canActivate: [AuthGuard] },
    { path: 'people/create', component: PeopleFormComponent, canActivate: [AuthGuard] },
    { path: 'people/edit/:id', component: PeopleFormComponent, canActivate: [AuthGuard] },

    { path: 'parameters', component: ParameterComponent, canActivate: [AuthGuard] },
    { path: 'parameters/create', component: ParameterFormComponent, canActivate: [AuthGuard] },
    { path: 'parameters/edit/:id', component: ParameterFormComponent, canActivate: [AuthGuard] },

    { path: 'places', component: PlaceComponent, canActivate: [AuthGuard] },
    { path: 'places/create', component: PlaceFormComponent, canActivate: [AuthGuard] },
    { path: 'places/edit/:id', component: PlaceFormComponent, canActivate: [AuthGuard] },
]

export default GENERAL_ROUTES;