import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AlertService } from "src/app/core/services/alert.service";
import { BaseComponent } from "src/app/features/shared/base/base.component";
import { SaleOrder, SaleOrderType } from "../../../models/sale";
import { SaleOrderService } from "../../../services/sale.service";

@Component({
    selector: 'app-sales-orders-wizard',
    templateUrl: './sale-orders-new.component.html',
    styleUrls: ['./sale-orders-new.component.scss']
})
export class SalesOrderAddComponent extends BaseComponent implements OnInit {
    
    saleOrder: SaleOrder;

    constructor(private _alertService: AlertService,
                private _saleOrderService: SaleOrderService,
                private _router: Router){
        super(_alertService)        
    }

    ngOnInit(): void {
        this.saleOrder = new SaleOrder();
    }

    stepToGoInHere(type: number){        
        this.saleOrder.type = type === 1 ? SaleOrderType.GetInHere : SaleOrderType.ToGo;
        this.createOrder();
    }

    private createOrder(){
        this._saleOrderService.create(this.saleOrder).subscribe(
            res => {                
                this._router.navigate(['sale-orders/view', res['id']]);
            }
        );
    }

}