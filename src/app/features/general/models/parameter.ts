import { BaseEntity } from "src/app/core/models/base.model";

export class Parameter extends BaseEntity {
    name: string;
    description: string;
    isPercent: boolean;
    value: number;
}