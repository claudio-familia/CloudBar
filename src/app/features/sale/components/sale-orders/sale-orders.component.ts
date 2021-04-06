import { Component, OnInit } from "@angular/core";
import { AlertService } from "src/app/core/services/alert.service";
import { BaseComponent } from "src/app/features/shared/base/base.component";

@Component({
    selector: 'app-sales-orders',
    templateUrl: './sale-orders.component.html',
    styleUrls: ['./sale-orders.component.scss']
})
export class SaleOrdersComponent extends BaseComponent implements OnInit {

    constructor(private _alertService: AlertService){
        super(_alertService)
    }

    ngOnInit(): void {        
    }

}