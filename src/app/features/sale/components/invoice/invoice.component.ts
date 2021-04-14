import { Component, Input, OnInit } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { AlertService } from "src/app/core/services/alert.service";
import { AppState } from "src/app/core/store/app.state";
import { BaseComponent } from "src/app/features/shared/base/base.component";
import { Invoice } from "../../models/invoice";
import { SaleOrder } from "../../models/sale";
import { getCurrenSaleOrder } from "../../state/sale.selector";

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
                private _store: Store<AppState>){
        super(_alertService)
        this.currentOrder$ = this._store.pipe(select(getCurrenSaleOrder))
    }

    ngOnInit(): void {
        if(!this.invoiceId){
            this.getSaleOrderData();
        }
    }


    private getSaleOrderData() {
        this.currentOrder$.subscribe(
            res => {
                this.saleOrder = res;
                console.log(this.saleOrder)
            }
        );
    }
}