import { BaseEntity } from "src/app/core/models/base.model";

export class Place extends BaseEntity {
    name: string;
    address: string;
    district: string;
    province: string;
    country: string;
    latitude: string;
    longitude: string;
}