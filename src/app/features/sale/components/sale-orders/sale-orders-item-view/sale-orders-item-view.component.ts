import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AlertService } from "src/app/core/services/alert.service";
import { BaseComponent } from "src/app/features/shared/base/base.component";
import { Item } from "src/app/features/warehouse/models/item";
import { ItemService } from "src/app/features/warehouse/services/item.service";
import { SaleOrder, SaleOrderType } from "../../../models/sale";
import { SaleOrderService } from "../../../services/sale.service";

@Component({
    selector: 'app-sales-orders-item-view',
    templateUrl: './sale-orders-item-view.component.html',
    styleUrls: ['./sale-orders-item-view.component.scss']
})
export class SalesOrderItemViewComponent extends BaseComponent implements OnInit {

    item: Item;

    constructor(private _alertService: AlertService,
        private _itemService: ItemService,
        private _currentRoute: ActivatedRoute) {
        super(_alertService)
    }

    ngOnInit(): void {
        this._currentRoute.params.subscribe(
            param => {
                this.getItemData(param.id);
            }
        );
    }

    getItemData(id: string) {
        this._itemService.getById(id).subscribe(
            res => {
                this.item = res;
            }
        );
    }
}