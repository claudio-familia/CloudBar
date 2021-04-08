import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AlertService } from "src/app/core/services/alert.service";
import { BaseComponent } from "src/app/features/shared/base/base.component";
import { Category } from "src/app/features/warehouse/models/category";
import { Item } from "src/app/features/warehouse/models/item";
import { CategoryService } from "src/app/features/warehouse/services/category.service";
import { ItemService } from "src/app/features/warehouse/services/item.service";
import { SaleOrder, SaleOrderType } from "../../../models/sale";
import { SaleOrderService } from "../../../services/sale.service";
import { debounceTime } from 'rxjs/operators';
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
    selector: 'app-sales-orders-item-menu',
    templateUrl: './sale-orders-item-menu.component.html',
    styleUrls: ['./sale-orders-item-menu.component.scss']
})
export class SalesOrderItemMenuComponent extends BaseComponent implements OnInit {

    categories: Category[] = [];
    items: Item[] = [];
    itemsFound: Item[] = [];
    
    searchForm: FormGroup;
    showNotFoundMessage: boolean = false;
    message: string = ''

    constructor(private _alertService: AlertService,
        private _saleOrderService: SaleOrderService,
        private _categoryService: CategoryService,
        private _itemService: ItemService,
        private _currentRoute: ActivatedRoute) {
        super(_alertService)
        this.searchForm = new FormGroup({
            search: new FormControl('', Validators.minLength(3))
        })
    }

    ngOnInit(): void {
        this.getCategories();
        this.getItems();
        this.searchForm.valueChanges.pipe(debounceTime(500)).subscribe(
            value => {
                this.searchProducts(value.search)
            }
        )
    }

    searchProducts(searchCriteria: string){
        this.showNotFoundMessage = false;
        this.message = '';
        if(searchCriteria.length < 3 || searchCriteria == ''){
            this.itemsFound = [];
            return;
        }
                    
        this._itemService.getByCriteria(searchCriteria)
        .subscribe(
            res => {
                this.itemsFound = res;
            },
            err => {
                console.log(err.error)
                if(err.status){
                    this.showNotFoundMessage = true;
                    this.message = err.error
                }
            }
        )
    }

    private getCategories(){
        this._categoryService.get().subscribe(
            res => {
                this.categories = res;
            }
        )
    }

    private getItems(){
        this._itemService.get().subscribe(
            res => {
                this.items = res;                
            }
        )
    }
}