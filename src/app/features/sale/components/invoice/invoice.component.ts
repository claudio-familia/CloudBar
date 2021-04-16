import { Component, Input, OnInit } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { AlertService } from "src/app/core/services/alert.service";
import { AppState } from "src/app/core/store/app.state";
import { BaseComponent } from "src/app/features/shared/base/base.component";
import { Invoice } from "../../models/invoice";
import { SaleOrder } from "../../models/sale";
import { SaleOrderService } from "../../services/sale.service";
import { getCurrenSaleOrder } from "../../state/sale.selector";
import * as printJS from 'print-js';

@Component({
    selector: 'app-invoice',
    templateUrl: './invoice.component.html',
    styleUrls: ['./invoice.component.scss', '../../../../../assets/css/boostrap-4.1.1.min.css']
})
export class InvoiceComponent extends BaseComponent implements OnInit {

    @Input() invoiceId: number;
    @Input() isDialog: boolean = true;
    currentOrder$: any;
    saleOrder: SaleOrder;
    invoice: Invoice;

    constructor(private _alertService: AlertService,
                private _saleOrderService: SaleOrderService,
                private _store: Store<AppState>){
        super(_alertService)
        this.currentOrder$ = this._store.pipe(select(getCurrenSaleOrder))
    }

    ngOnInit(): void {
        if(!this.invoiceId){
            this.getSaleOrderData();
        }else{
            this._saleOrderService.getInvoiceByOrderId(this.invoiceId.toString()).subscribe(
                res => {
                    this.invoice = res;
                }
            )
        }
    }

    print(){
        printJS({
            printable: 'printJS-form',
            type:  'html',
            css: '../../../../../assets/css/boostrap-4.1.1.min.css'
        })
    }


    private getSaleOrderData() {
        this.currentOrder$.subscribe(
            res => {
                this.saleOrder = res;                
            }
        );
    }
}