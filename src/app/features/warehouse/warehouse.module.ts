import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from 'src/app/core/core.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { CategoryComponent } from './components/category/category.component';
import { CategoryFormComponent } from './components/category/form/category.form.component';
import { RouterModule } from '@angular/router';
import { ItemFormComponent } from './components/items/form/item.form.component';
import { ItemComponent } from './components/items/item.component';
import { WarehouseRoutingModule } from './routes/warehouse-routing.module';



@NgModule({
  declarations: [
    CategoryComponent,
    CategoryFormComponent,
    ItemComponent,
    ItemFormComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    SharedModule,
    CoreModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    WarehouseRoutingModule
  ],
})
export class WarehouseModule { }
