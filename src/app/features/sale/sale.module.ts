import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { CoreModule } from "src/app/core/core.module";
import { SharedModule } from "../shared/shared.module";
import { SalesOrderItemMenuComponent } from "./components/sale-orders/sale-orders-item-menu/sale-orders-item-menu.component";
import { SalesOrderItemSearchComponent } from "./components/sale-orders/sale-orders-item-search/sale-orders-item-search.component";
import { SalesOrderItemViewComponent } from "./components/sale-orders/sale-orders-item-view/sale-orders-item-view.component";
import { SalesOrderViewComponent } from "./components/sale-orders/sale-orders-view/sale-orders-view.component";
import { SaleOrdersComponent } from "./components/sale-orders/sale-orders.component";
import { SalesOrderAddComponent } from "./components/sale-orders/sales-ordes-new/sale-orders-new.component";

@NgModule({
    declarations: [
        SaleOrdersComponent,
        SalesOrderAddComponent,
        SalesOrderViewComponent,
        SalesOrderItemViewComponent,
        SalesOrderItemMenuComponent,
        SalesOrderItemSearchComponent
    ],
    imports: [
        RouterModule,
        CoreModule,
        SharedModule,
        BrowserModule,
        ReactiveFormsModule
    ],
})
export class SaleModule { }