import { BaseEntity } from "src/app/core/models/base.model";

export class SaleOrder extends BaseEntity {
    userId?: number;
    placeId?: number;
    clientId?: number;
    employeeId?: number;
    number: string;
    type: string;
    total: number;
    rating?: number;
    lines: SaleOrderLine[];
}

export class SaleOrderLine extends BaseEntity {
    orderId: number;
    itemId: number;
    quantity: number;
    price: number;
}

export const SaleOrderType = {
    ToGo: 'To Go',
    GetInHere: 'Get here'
}