import { BaseEntity } from "src/app/core/models/base.model";

export class Role extends BaseEntity {
    name: string;
    description: string;
}