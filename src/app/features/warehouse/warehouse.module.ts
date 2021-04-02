import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from 'src/app/core/core.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { CategoryComponent } from './components/category/category.component';
import { CategoryFormComponent } from './components/category/form/category.form.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    CategoryComponent,
    CategoryFormComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    SharedModule,
    FormsModule,
    RouterModule,
    HttpClientModule
  ],
})
export class WarehouseModule { }
