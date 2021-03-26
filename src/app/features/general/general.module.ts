import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { PeopleComponent } from './components/people/people.component';
import { CoreModule } from 'src/app/core/core.module';




@NgModule({
  declarations: [HomeComponent, PeopleComponent],
  imports: [
    CommonModule,
    CoreModule
  ]
})
export class GeneralModule { }
