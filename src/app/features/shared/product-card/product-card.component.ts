import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-product-card',
    templateUrl: './product-card.component.html',
    styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {

    @Input() title: string;
    @Input() subtitle: string;
    @Input() img: string = '../../../../../assets/images/placeholder.png';
    @Input() price: string;

    constructor() { }

    ngOnInit(): void {
    }

}
