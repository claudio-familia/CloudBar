import { Routes } from "@angular/router";
import { CategoryComponent } from "../features/warehouse/components/category/category.component";
import { CategoryFormComponent } from "../features/warehouse/components/category/form/category.form.component";

import { AuthGuard } from "./guards/auth.guard";

const WAREHOUSE_ROUTES :Routes = [
    { path: 'categories', component: CategoryComponent, canActivate: [AuthGuard] },
    { path: 'categories/create', component: CategoryFormComponent, canActivate: [AuthGuard] },
    { path: 'categories/edit/:id', component: CategoryFormComponent, canActivate: [AuthGuard] },
]

export default WAREHOUSE_ROUTES;