import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { AlertService } from "src/app/core/services/alert.service";
import { AppState } from "src/app/core/store/app.state";
import { Invoice, InvoiceLine } from "../../../models/invoice";
import { SaleOrder } from "../../../models/sale";
import { SaleOrderService } from "../../../services/sale.service";
import { getCurrenSaleOrder } from "../../../state/sale.selector";

@Component({
    selector: 'app-sales-orders-invoice',
    templateUrl: './sale-orders-invoice.component.html',
    styleUrls: ['./sale-orders-invoice.component.scss']
})
export class SaleOrderInvoiceComponent implements OnInit {
    identificationTypes: any[] = [];
    paymentTypes: any[] = [];
    currentOrder$: any;
    saleOrder: SaleOrder;
    rnc: string = ''
    paymentCard: any = {
        dueDate: null,
        digits: '',
        bank: ''
    };
    selectedIdentificationType: string;
    selectedPaymentType: string;

    constructor(private _alertService: AlertService,
        private _saleOrderService: SaleOrderService,
        private _store: Store<AppState>,
        private _router: Router) {

        this.currentOrder$ = this._store.pipe(select(getCurrenSaleOrder))

        this.identificationTypes = [
            {
                title: 'Con comprobante',                
                icon: 'account_balance',
                value: 'Tax receipt'
            },
            {
                title: 'Sin comprobante',
                icon: 'badge',
                value: 'Without tax receipt'
            }
        ]

        this.paymentTypes = [
            {
                title: 'Efectivo',                
                icon: 'account_balance',
                value: 'payments'
            },
            {
                title: 'Tarjeta de credito o debito',
                icon: 'payment',
                value: 'Credit or Debit Card'
            }
        ]
    }

    ngOnInit(): void {
        this.currentOrder$.subscribe(
            res => {
                this.saleOrder = res;
            }
        )
    }

    close() {
        this._router.navigate(['sale-orders/view', this.saleOrder.id]);
    }
    
    selectIdentification(value: string){
        this.selectedIdentificationType = value;
    }

    selectPayment(value: string){
        this.selectedPaymentType = value;
    }

    validate(): Boolean {
        if(!this.selectedIdentificationType){
            this._alertService.ToasterNotification('Aviso','Debe de especificar el tipo de factura', 'info')
            return false;
        }

        if(!this.selectedPaymentType){
            this._alertService.ToasterNotification('Aviso','Debe de especificar el modo de pago', 'info')
            return false;
        }

        if(this.selectedIdentificationType == 'Tax receipt' && this.rnc == '') {
            this._alertService.ToasterNotification('Aviso','Debe de especificar el RNC si la factura es con comprobante fiscal', 'info')
            return false;
        }

        if(this.selectedPaymentType == 'Credit or Debit Card' && ((this.paymentCard.digits.length < 4 || this.paymentCard.digits == '') || this.paymentCard.dueDate == '' || this.paymentCard.bank == '')){
            this._alertService.ToasterNotification('Aviso','Debe de completar la información de la tarjeta para continuar', 'info')  
            return false;
        }

        return true;
    }

    getSelectedType() {
        return this.paymentTypes.find(item => item.isSelected);
    }

    createInvoice() {
        if (!this.validate()) return;
        
        const invoiceLines: InvoiceLine[] = this.getLines();

        const invoice: Invoice = {
            date: this.saleOrder.createdAt,
            lawTip: this.saleOrder.total*0.1,
            taxes: this.saleOrder.total*0.18,
            ncf: '',
            ncfDueDate: null,
            orderId: this.saleOrder.id,
            paymentType: this.selectedPaymentType,
            rnc: this.rnc,
            total: this.saleOrder.total*1.28,
            lines: invoiceLines
        }        

        this._saleOrderService.createInvoice(invoice).subscribe(
            res => {
                this._alertService.ModalNotification('Operación exitosa', 'La orden se ha pagado correctamente, gracias por preferirnos', 'success').then(
                    res => {
                        this._router.navigate(['sale-orders']);
                    }
                )
            }
        )
    }
    getLines(): InvoiceLine[] {
        const response: InvoiceLine[] = []

        this.saleOrder.lines.forEach(line => {
            response.push({
                orderLineId: line.id,
                taxes: line.price*0.18
            })
        })

        return response;
    }

}