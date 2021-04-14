import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { AlertService } from "src/app/core/services/alert.service";
import { AppState } from "src/app/core/store/app.state";
import { Place } from "src/app/features/general/models/place";
import { EmployeeService } from "src/app/features/general/services/employee.service";
import { getCurrentPlace } from "src/app/features/security/state/security.selector";
import { BaseComponent } from "src/app/features/shared/base/base.component";
import { Client } from "../../../models/client";
import { SaleOrder, SaleOrderType } from "../../../models/sale";
import { ClientService } from "../../../services/client.service";
import { SaleOrderService } from "../../../services/sale.service";
import * as saleActions from '../../../state/actions/sale.actions';

@Component({
    selector: 'app-sales-orders-wizard',
    templateUrl: './sale-orders-new.component.html',
    styleUrls: ['./sale-orders-new.component.scss']
})
export class SalesOrderAddComponent extends BaseComponent implements OnInit {
    
    saleOrder: SaleOrder;
    selectedClient: Client;
    clients: Client[] = [];
    clientsFiltered: Client[] = [];
    employees: Client[] = [];
    selectedEmployee: Client;
    employeesFiltered: Client[] = [];
    orderTypes: any[] = [];
    currentPlace$: any;
    currentplace: Place;

    constructor(private _alertService: AlertService,
                private _saleOrderService: SaleOrderService,
                private _clientService: ClientService,
                private _employeeService: EmployeeService,
                private _chkChangesService: ChangeDetectorRef,
                private _store: Store<AppState>,
                private _router: Router){
        super(_alertService)
        this.currentPlace$ = this._store.pipe(select(getCurrentPlace))
    }

    ngOnInit(): void {
        this.saleOrder = new SaleOrder();
        this.orderTypes = [
            {
                title: 'Consumir aqui',
                img: '../../../../assets/images/orders/wine-bottle.png',
                isSelected: false
            },
            {
                title: 'Para llevar',
                img: '../../../../assets/images/orders/clock.png',
                isSelected: false
            }
        ]
        this.getClients();
        this.getEmployee();
        this.currentPlace$.subscribe(
            res => {
                this.currentplace = res;
            }
        )
    }

    selectType(orderType: any){
        const orderTypes = this.orderTypes.slice();        
        const type = {...orderType};
        const index = orderTypes.findIndex(item => item.title === type.title);

        this.orderTypes.forEach((item) => {
            item.isSelected = false;
        });

        type.isSelected = true;
        
        orderTypes.splice(index, 1, type);

        this.orderTypes = orderTypes;
    }

    getClients(){
        this._clientService.get().subscribe(
            res => {
                this.clientsFiltered = res
                this.clients = [...res]
            }
        )
    }

    getEmployee(){
        this._employeeService.get().subscribe(
            res => {
                this.employeesFiltered = res
                this.employees = [...res]
            }
        )
    }

    close(){
        this._router.navigate(['sale-orders']);
    }

    validate(): Boolean{
        const hasTypeBeenSelected = this.orderTypes.find(item => item.isSelected);
        if(!hasTypeBeenSelected) {
            this._alertService.ToasterNotification('Aviso', 'Debe seleccionar el tipo de orden para continuar', 'info');
            return false;
        }
        if(!this.selectedClient) {
            this._alertService.ToasterNotification('Aviso', 'Debe seleccionar el cliente de orden para continuar', 'info');
            return false;
        }
        if(!this.selectedEmployee) {
            this._alertService.ToasterNotification('Aviso', 'Debe seleccionar el empleado de orden para continuar', 'info');
            return false;
        }
        return true;
    }

    getSelectedType(){
        return this.orderTypes.find(item => item.isSelected);
    }

    createOrder(){
        if(!this.validate()) return;
        const orderType = this.getSelectedType()
        this.saleOrder.type = orderType.title == 'Consumir aqui' ? SaleOrderType.GetInHere : SaleOrderType.ToGo;
        this.saleOrder.clientId = this.selectedClient.id;
        this.saleOrder.employeeId = this.selectedEmployee.id;
        this.saleOrder.placeId = this.currentplace.id;
        this._saleOrderService.create(this.saleOrder).subscribe(
            res => {
                this._store.dispatch(saleActions.setCurrentSaleOrder({currentSaleOrder: res}));
                this._router.navigate(['sale-orders/view', res['id']]);
            }
        );
    }

}