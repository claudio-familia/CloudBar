import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { PeopleComponent } from './components/people/people.component';
import { CoreModule } from 'src/app/core/core.module';
import { PeopleFormComponent } from './components/people/form/people.form.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { PlaceComponent } from './components/place/place.component';
import { ParameterComponent } from './components/parameter/parameter.component';
import { ParameterFormComponent } from './components/parameter/form/parameter.form.component';
import { PlaceFormComponent } from './components/place/form/place.form.component';
import { EmployeeFormComponent } from './components/employee/form/employee.form.component';
import { EmployeeComponent } from './components/employee/employee.component';




@NgModule({
  declarations: [
    HomeComponent, 
    PeopleComponent, 
    PeopleFormComponent, 
    PlaceComponent, 
    PlaceFormComponent,
    ParameterComponent,
    ParameterFormComponent,
    EmployeeComponent,
    EmployeeFormComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    RouterModule,
    SharedModule
  ]
})
export class GeneralModule { }
