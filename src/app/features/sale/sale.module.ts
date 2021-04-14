import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { StoreModule } from "@ngrx/store";
import { CoreModule } from "src/app/core/core.module";
import { FeatureStates } from "src/app/core/store/app.constant";
import { SharedModule } from "../shared/shared.module";
import { ClientComponent } from "./components/clients/client.component";
import { ClientFormComponent } from "./components/clients/form/client.form.component";
import { InvoiceComponent } from "./components/invoice/invoice.component";
import { SaleOrderInvoiceComponent } from "./components/sale-orders/sale-orders-invoice/sale-orders-invoice.component";
import { SalesOrderItemMenuComponent } from "./components/sale-orders/sale-orders-item-menu/sale-orders-item-menu.component";
import { SalesOrderItemSearchComponent } from "./components/sale-orders/sale-orders-item-search/sale-orders-item-search.component";
import { SalesOrderItemViewComponent } from "./components/sale-orders/sale-orders-item-view/sale-orders-item-view.component";
import { SalesOrderViewComponent } from "./components/sale-orders/sale-orders-view/sale-orders-view.component";
import { SaleOrdersComponent } from "./components/sale-orders/sale-orders.component";
import { SalesOrderAddComponent } from "./components/sale-orders/sales-ordes-new/sale-orders-new.component";
import { saleReducer } from "./state/sale.reducer";

@NgModule({
    declarations: [
        SaleOrdersComponent,
        SalesOrderAddComponent,
        SalesOrderViewComponent,
        SalesOrderItemViewComponent,
        SalesOrderItemMenuComponent,
        SalesOrderItemSearchComponent,
        ClientComponent,
        ClientFormComponent,
        SaleOrderInvoiceComponent,
        InvoiceComponent
    ],
    imports: [
        RouterModule,
        CoreModule,
        SharedModule,
        FormsModule,
        BrowserModule,
        ReactiveFormsModule,
        StoreModule.forFeature(FeatureStates.sale, saleReducer)
    ],
})
export class SaleModule { }