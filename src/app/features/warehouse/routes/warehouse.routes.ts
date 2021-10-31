import { Routes } from "@angular/router";
import { CategoryComponent } from "../components/category/category.component";
import { CategoryFormComponent } from "../components/category/form/category.form.component";
import { ItemFormComponent } from "../components/items/form/item.form.component";
import { ItemComponent } from "../components/items/item.component";

import { AuthGuard } from "../../../routes/guards/auth.guard";
import { PlaceGuard } from "../../../routes/guards/place.guard";

const WAREHOUSE_ROUTES :Routes = [
    { path: 'categories', component: CategoryComponent, canActivate: [AuthGuard] },
    { path: 'categories/create', component: CategoryFormComponent, canActivate: [AuthGuard, PlaceGuard] },
    { path: 'categories/edit/:id', component: CategoryFormComponent, canActivate: [AuthGuard, PlaceGuard] },

    { path: 'items', component: ItemComponent, canActivate: [AuthGuard] },
    { path: 'items/create', component: ItemFormComponent, canActivate: [AuthGuard, PlaceGuard] },
    { path: 'items/edit/:id', component: ItemFormComponent, canActivate: [AuthGuard, PlaceGuard] },
]

export default WAREHOUSE_ROUTES;