import { Routes } from "@angular/router";
import { EmployeeComponent } from "../components/employee/employee.component";
import { EmployeeFormComponent } from "../components/employee/form/employee.form.component";
import { HomeComponent } from "../components/home/home.component";
import { ParameterFormComponent } from "../components/parameter/form/parameter.form.component";
import { ParameterComponent } from "../components/parameter/parameter.component";
import { PeopleFormComponent } from "../components/people/form/people.form.component";
import { PeopleComponent } from "../components/people/people.component";
import { PlaceFormComponent } from "../components/place/form/place.form.component";
import { PlaceComponent } from "../components/place/place.component";
import { AuthGuard } from "../../../routes/guards/auth.guard";
import { PlaceGuard } from "../../../routes/guards/place.guard";

const GENERAL_ROUTES :Routes = [       
    { path: 'people', component: PeopleComponent, canActivate: [AuthGuard] },
    { path: 'people/create', component: PeopleFormComponent, canActivate: [AuthGuard, PlaceGuard] },
    { path: 'people/edit/:id', component: PeopleFormComponent, canActivate: [AuthGuard, PlaceGuard] },

    { path: 'parameters', component: ParameterComponent, canActivate: [AuthGuard] },
    { path: 'parameters/create', component: ParameterFormComponent, canActivate: [AuthGuard, PlaceGuard] },
    { path: 'parameters/edit/:id', component: ParameterFormComponent, canActivate: [AuthGuard, PlaceGuard] },

    { path: 'places', component: PlaceComponent, canActivate: [AuthGuard] },
    { path: 'places/create', component: PlaceFormComponent, canActivate: [AuthGuard] },
    { path: 'places/edit/:id', component: PlaceFormComponent, canActivate: [AuthGuard] },

    { path: 'employees', component: EmployeeComponent, canActivate: [AuthGuard, PlaceGuard] },
    { path: 'employees/edit/:id', component: EmployeeFormComponent, canActivate: [AuthGuard, PlaceGuard] },
    { path: 'employees/create', component: EmployeeFormComponent, canActivate: [AuthGuard, PlaceGuard] },
]

export default GENERAL_ROUTES;