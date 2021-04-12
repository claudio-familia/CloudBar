import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { AlertService } from "src/app/core/services/alert.service";
import { AppState } from "src/app/core/store/app.state";
import { BaseComponent } from "src/app/features/shared/base/base.component";
import { SaleOrder, SaleOrderType } from "../../../models/sale";
import { SaleOrderService } from "../../../services/sale.service";
import * as saleActions from '../../../state/actions/sale.actions';

@Component({
    selector: 'app-sales-orders-wizard',
    templateUrl: './sale-orders-new.component.html',
    styleUrls: ['./sale-orders-new.component.scss']
})
export class SalesOrderAddComponent extends BaseComponent implements OnInit {
    
    saleOrder: SaleOrder;

    constructor(private _alertService: AlertService,
                private _saleOrderService: SaleOrderService,
                private _store: Store<AppState>,
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
                this._store.dispatch(saleActions.setCurrentSaleOrder({currentSaleOrder: res}));
                this._router.navigate(['sale-orders/view', res['id']]);
            }
        );
    }

}