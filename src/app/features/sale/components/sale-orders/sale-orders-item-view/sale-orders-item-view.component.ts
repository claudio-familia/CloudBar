import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { AlertService } from "src/app/core/services/alert.service";
import { AppState } from "src/app/core/store/app.state";
import { BaseComponent } from "src/app/features/shared/base/base.component";
import { Item } from "src/app/features/warehouse/models/item";
import { ItemService } from "src/app/features/warehouse/services/item.service";
import { SaleOrder, SaleOrderLine, SaleOrderType } from "../../../models/sale";
import { SaleOrderService } from "../../../services/sale.service";
import { getCurrenSaleOrder } from "../../../state/sale.selector";

@Component({
    selector: 'app-sales-orders-item-view',
    templateUrl: './sale-orders-item-view.component.html',
    styleUrls: ['./sale-orders-item-view.component.scss']
})
export class SalesOrderItemViewComponent extends BaseComponent implements OnInit {

    item: Item;
    currentOrder: SaleOrder;
    currentOrder$: any;
    quantity: number = 1;
    wasAddedBefore: boolean;
    oldLine: SaleOrderLine;

    constructor(private _alertService: AlertService,
        private _itemService: ItemService,
        private _saleOrderService: SaleOrderService,
        private _currentRoute: ActivatedRoute,
        private _router: Router,
        private _store: Store<AppState>) {
        super(_alertService)
        this.currentOrder$ = this._store.pipe(select(getCurrenSaleOrder));
    }

    ngOnInit(): void {
        this._currentRoute.params.subscribe(
            param => {
                this.getItemData(param.id);
                this.getCurrentOrder(param.id);
            }
        );
    }

    getCurrentOrder(id: number){
        this.currentOrder$.subscribe(
            res => {
                this.currentOrder = res;
                const currentItem = this.currentOrder ? this.currentOrder.lines.find(item => item.itemId == id) : null;                
                if(currentItem) {
                    this.wasAddedBefore = true;
                    this.oldLine = {...currentItem};
                    delete this.oldLine['creator']
                }
            }
        )
    }

    orderProduct(){
        if(this.wasAddedBefore){
            this.oldLine.quantity += this.quantity;            
            this._saleOrderService.updateProductFromOrder(this.oldLine).subscribe(
                res => {
                    this._router.navigateByUrl('sale-orders/view/'+this.oldLine.orderId)
                },
                err => this.getHttpErrorResponse(err)
            )
        }else{
            const line = <SaleOrderLine>{
                itemId: this.item.id,
                orderId: this.currentOrder.id,
                price: this.item.price,
                quantity: this.quantity,
            }
            this._saleOrderService.addProductToOrder(line).subscribe(
                res => {
                    this._router.navigateByUrl('sale-orders/view/'+line.orderId)
                },
                err => this.getHttpErrorResponse(err)
            )
        }
    }

    getItemData(id: string) {
        this._itemService.getById(id).subscribe(
            res => {
                this.item = res;
            },
            err => this.getHttpErrorResponse(err)
        );
    }
}