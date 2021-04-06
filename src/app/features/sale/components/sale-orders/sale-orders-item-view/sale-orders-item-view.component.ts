import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AlertService } from "src/app/core/services/alert.service";
import { BaseComponent } from "src/app/features/shared/base/base.component";
import { SaleOrder, SaleOrderType } from "../../../models/sale";
import { SaleOrderService } from "../../../services/sale.service";

@Component({
    selector: 'app-sales-orders-item-view',
    templateUrl: './sale-orders-item-view.component.html',
    styleUrls: ['./sale-orders-item-view.component.scss']
})
export class SalesOrderItemViewComponent extends BaseComponent implements OnInit {

    constructor(private _alertService: AlertService,
        private _saleOrderService: SaleOrderService,
        private _currentRoute: ActivatedRoute) {
        super(_alertService)
    }

    ngOnInit(): void {       
    }
}