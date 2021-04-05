import { Category } from "./category";

export class Item {
    categoryId: number;
    name: string;
    description: string;
    stock: number;
    price: number;
    imgUrl: string;
    category?: Category
}