import { BaseEntity } from "src/app/core/models/base.model";

export class Person extends BaseEntity {    
    identification: string;
    name: string;
    lastName: string;
    datebirth: Date;
    address: string;
    district: string;
    province: string;
    nationality: string;
    phone: string;
    placeId?: number;
}