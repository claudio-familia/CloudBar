import { Component, OnChanges, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { ActivatedRoute } from "@angular/router";
import { Store } from "@ngrx/store";
import { AlertService } from "src/app/core/services/alert.service";
import { AppState } from "src/app/core/store/app.state";
import { BaseComponent } from "src/app/features/shared/base/base.component";
import { SaleOrder, SaleOrderLine, SaleOrderType } from "../../../models/sale";
import { SaleOrderService } from "../../../services/sale.service";
import * as SaleOrderActions from '../../../state/actions/sale.actions';
import { InvoiceComponent } from "../../invoice/invoice.component";

@Component({
    selector: 'app-sales-orders-view',
    templateUrl: './sale-orders-view.component.html',
    styleUrls: ['./sale-orders-view.component.scss']
})
export class SalesOrderViewComponent extends BaseComponent implements OnInit, OnChanges {

    saleOrder: SaleOrder;
    displayedColumns: string[] = ['image', 'itemName', 'quantity', 'unitPrice', 'totalPrice'];

    dataSource: MatTableDataSource<SaleOrderLine>;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(private _alertService: AlertService,
        private _saleOrderService: SaleOrderService,
        private _store: Store<AppState>,
        private _currentRoute: ActivatedRoute,
        public dialog: MatDialog) {
        super(_alertService)
    }

    ngOnInit(): void {
        this._currentRoute.params.subscribe(
            params => {
                this._saleOrderService.getById(params.id).subscribe(
                    res => {
                        this.saleOrder = res;
                        this._store.dispatch(SaleOrderActions.setCurrentSaleOrder({currentSaleOrder: this.saleOrder}));
                        this.dataSource = new MatTableDataSource(this.saleOrder.lines);
                    },
                    err => this.getHttpErrorResponse(err)
                )
            }
        )
    }

    getTotal(){
        return this.saleOrder ? this.saleOrder.lines.map(t => t.price * t.quantity).reduce((acc, value) => acc + value, 0) : 0;
    }

    ngOnChanges() {
        if (this.dataSource) {
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        }
    }

    askForInvoice(){
        this.dialog.open(InvoiceComponent);
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }
}