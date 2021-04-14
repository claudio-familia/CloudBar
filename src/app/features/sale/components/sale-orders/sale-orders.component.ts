import { AfterViewInit, Component, OnChanges, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { AlertService } from "src/app/core/services/alert.service";
import { AppState } from "src/app/core/store/app.state";
import { BaseComponent } from "src/app/features/shared/base/base.component";
import { SaleOrder } from "../../models/sale";
import { SaleOrderService } from "../../services/sale.service";
import * as saleActions from '../../state/actions/sale.actions';

@Component({
    selector: 'app-sales-orders',
    templateUrl: './sale-orders.component.html',
    styleUrls: ['./sale-orders.component.scss']
})
export class SaleOrdersComponent extends BaseComponent implements OnChanges, OnInit {


    displayedColumns: string[] = ['number', 'type', 'total', 'client', 'status', 'options'];
    dataSource: MatTableDataSource<SaleOrder>;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    
    orders: SaleOrder[] = []

    constructor(private _alertService: AlertService,
                private _saleOrderService: SaleOrderService,
                private _router: Router,
                private _store: Store<AppState>) {
        super(_alertService)        
    }

    ngOnInit(): void {
        this.getSaleOrders()
    }

    getSaleOrders() {
        this._saleOrderService.get().subscribe(
            res => {                
                this.orders = res;
                this.dataSource = new MatTableDataSource(this.orders);
            },
            err => this.getHttpErrorResponse(err)
        )        
    }

    viewOrder(saleOrder: SaleOrder){
        this._store.dispatch(saleActions.setCurrentSaleOrder({currentSaleOrder: saleOrder}));
        this._router.navigate(['/sale-orders/view/', saleOrder.id]);
    }

    deleteOrder(saleOrder: SaleOrder){
        this._alertService.ModalNotification('Aviso', '¿Está seguro que desea eliminar la orden?', 'question')
        .then(res => {
            if(res.isConfirmed) {
                this._saleOrderService.delete(saleOrder.id.toString()).subscribe(res => {
                    this._alertService.ToasterNotification('Exitoso', 'Orden de venta eliminada correctamente', 'success')
                    this.getSaleOrders();
                }, err => this.getHttpErrorResponse(err));
            }
        })
    }

    ngOnChanges() {
        if(this.dataSource){
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        }
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }
}