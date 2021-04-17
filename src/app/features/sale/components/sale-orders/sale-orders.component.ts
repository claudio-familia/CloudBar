import { AfterViewInit, Component, OnChanges, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { AlertService } from "src/app/core/services/alert.service";
import { AppState } from "src/app/core/store/app.state";
import { getCurrentUser } from "src/app/features/security/state/security.selector";
import { BaseComponent } from "src/app/features/shared/base/base.component";
import { SaleOrder } from "../../models/sale";
import { SaleOrderService } from "../../services/sale.service";
import * as saleActions from '../../state/actions/sale.actions';
import jwt_decode from 'jwt-decode'
import { InvoiceComponent } from "../invoice/invoice.component";
import { MatDialog } from "@angular/material/dialog";
import { RoleEnum } from "src/app/core/models/roles.enum";

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
    currentUser$: any;
    roleId: any;
    isClient: any;
    clientId: any;

    constructor(private _alertService: AlertService,
        private _saleOrderService: SaleOrderService,
        private _router: Router,
        public dialog: MatDialog,
        private _store: Store<AppState>) {
        super(_alertService)
        this.currentUser$ = this._store.pipe(select(getCurrentUser));
    }

    ngOnInit(): void {
        this.validateRole();
        this.getSaleOrders();
    }

    getSaleOrders() {
        if(this.isClient){ 
            this._saleOrderService.getByClient(this.clientId).subscribe(
                res => {
                    this.orders = res;
                    this.dataSource = new MatTableDataSource(this.orders);
                },
                err => this.getHttpErrorResponse(err)
            )
        }else{
            this._saleOrderService.get().subscribe(
                res => {
                    this.orders = res;
                    this.dataSource = new MatTableDataSource(this.orders);
                },
                err => this.getHttpErrorResponse(err)
            )
        }
    }

    private validateRole() {
        this.currentUser$.subscribe(
            res => {
                if (res) {
                    const tokenData = jwt_decode(res.token);                    
                    this.roleId = tokenData['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
                    this.isClient = this.roleId == RoleEnum.Client;
                    if(this.isClient){                        
                        this.clientId = tokenData['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/sid'];
                    }
                }
            }
        );
    }

    askForInvoice(row: SaleOrder){        
        let _invoiceComponent = this.dialog.open(InvoiceComponent);
        _invoiceComponent.componentInstance.invoiceId = row.id;
    }

    viewOrder(saleOrder: SaleOrder) {
        this._store.dispatch(saleActions.setCurrentSaleOrder({ currentSaleOrder: saleOrder }));
        this._router.navigate(['/sale-orders/view/', saleOrder.id]);
    }

    deleteOrder(saleOrder: SaleOrder) {
        this._alertService.ModalNotification('Aviso', '¿Está seguro que desea eliminar la orden?', 'question')
            .then(res => {
                if (res.isConfirmed) {
                    this._saleOrderService.delete(saleOrder.id.toString()).subscribe(res => {
                        this._alertService.ToasterNotification('Exitoso', 'Orden de venta eliminada correctamente', 'success')
                        this.getSaleOrders();
                    }, err => this.getHttpErrorResponse(err));
                }
            })
    }

    ngOnChanges() {
        if (this.dataSource) {
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