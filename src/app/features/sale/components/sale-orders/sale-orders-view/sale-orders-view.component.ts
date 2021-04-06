import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AlertService } from "src/app/core/services/alert.service";
import { BaseComponent } from "src/app/features/shared/base/base.component";
import { SaleOrder, SaleOrderType } from "../../../models/sale";
import { SaleOrderService } from "../../../services/sale.service";

@Component({
    selector: 'app-sales-orders-view',
    templateUrl: './sale-orders-view.component.html',
    styleUrls: ['./sale-orders-view.component.scss']
})
export class SalesOrderViewComponent extends BaseComponent implements OnInit {

    saleOrder: SaleOrder;
    displayedColumns: string[] = ['image', 'itemName', 'quantity', 'unitPrice', 'totalPrice'];
    dataSource = [];

    constructor(private _alertService: AlertService,
        private _saleOrderService: SaleOrderService,
        private _currentRoute: ActivatedRoute) {
        super(_alertService)
    }

    ngOnInit(): void {
        this._currentRoute.params.subscribe(
            params => {
                this._saleOrderService.getById(params.id).subscribe(
                    res => {
                        this.saleOrder = res;
                    }
                )
            }
        )
    }
}