import { BaseEntity } from "src/app/core/models/base.model";

export class Category extends BaseEntity {
    name: string;
    description: string;
    imgUrl: string;
}