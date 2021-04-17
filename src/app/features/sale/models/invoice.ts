export class Invoice {
    id?: number;
    orderId: number;
    lawTip: number;
    taxes:number;
    total: number;
    date: Date;
    ncf: string;
    ncfDueDate: Date;
    paymentType: string;
    rnc: string;
    lines: InvoiceLine[]
}

export class InvoiceLine {
    id?:number;
    invoiceId?: number;
    orderLineId: number;
    taxes: number;
}