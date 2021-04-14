import { Routes } from "@angular/router";
import { ClientComponent } from "../features/sale/components/clients/client.component";
import { ClientFormComponent } from "../features/sale/components/clients/form/client.form.component";
import { InvoiceComponent } from "../features/sale/components/invoice/invoice.component";
import { SaleOrderInvoiceComponent } from "../features/sale/components/sale-orders/sale-orders-invoice/sale-orders-invoice.component";
import { SalesOrderItemMenuComponent } from "../features/sale/components/sale-orders/sale-orders-item-menu/sale-orders-item-menu.component";
import { SalesOrderItemSearchComponent } from "../features/sale/components/sale-orders/sale-orders-item-search/sale-orders-item-search.component";
import { SalesOrderItemViewComponent } from "../features/sale/components/sale-orders/sale-orders-item-view/sale-orders-item-view.component";
import { SalesOrderViewComponent } from "../features/sale/components/sale-orders/sale-orders-view/sale-orders-view.component";
import { SaleOrdersComponent } from "../features/sale/components/sale-orders/sale-orders.component";
import { SalesOrderAddComponent } from "../features/sale/components/sale-orders/sales-ordes-new/sale-orders-new.component";
import { AuthGuard } from "./guards/auth.guard";
import { PlaceGuard } from "./guards/place.guard";

const SALE_ROUTES :Routes = [
    { path: 'sale-orders', component: SaleOrdersComponent, canActivate: [AuthGuard] },
    { path: 'sale-orders/new', component: SalesOrderAddComponent, canActivate: [AuthGuard, PlaceGuard] },    
    { path: 'sale-orders/view/:id', component: SalesOrderViewComponent, canActivate: [AuthGuard, PlaceGuard] },
    { path: 'sale-orders/item/menu', component: SalesOrderItemMenuComponent, canActivate: [AuthGuard, PlaceGuard] },
    { path: 'sale-orders/item/search', component: SalesOrderItemSearchComponent, canActivate: [AuthGuard, PlaceGuard] },
    { path: 'sale-orders/item/view/:id', component: SalesOrderItemViewComponent, canActivate: [AuthGuard, PlaceGuard] },
    { path: 'sale-orders/invoice', component: SaleOrderInvoiceComponent, canActivate: [AuthGuard, PlaceGuard] },

    { path: 'invoice', component: InvoiceComponent, canActivate: [AuthGuard, PlaceGuard] },    

    { path: 'clients', component: ClientComponent, canActivate: [AuthGuard, PlaceGuard] },
    { path: 'clients/edit/:id', component: ClientFormComponent, canActivate: [AuthGuard, PlaceGuard] },
    { path: 'clients/create', component: ClientFormComponent, canActivate: [AuthGuard, PlaceGuard] },
]

export default SALE_ROUTES;