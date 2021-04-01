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




@NgModule({
  declarations: [HomeComponent, PeopleComponent, PeopleFormComponent, PlaceComponent, ParameterComponent],
  imports: [
    CommonModule,
    CoreModule,
    RouterModule,
    SharedModule
  ]
})
export class GeneralModule { }
