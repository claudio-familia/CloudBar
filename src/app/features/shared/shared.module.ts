import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { CoreModule } from "src/app/core/core.module";
import { DynamicformComponent } from "./dynamicform/dynamicform.component";
import { CardComponent } from './card/card.component';
import { RouterModule } from "@angular/router";
import { DynamictableComponent } from "./dynamictable/dynamictable.component";
import { NgxMaskModule, IConfig } from 'ngx-mask'
import { CardSelectorItemComponent } from "./card-selector-item/card-selector-item.component";
import { BusinessCardComponent } from "./business-card/business-card.component";
import { ProductCardComponent } from "./product-card/product-card.component";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const maskConfig: Partial<IConfig> = {
    validation: false,
};

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        CoreModule,
        RouterModule,        
        BrowserModule,
        BrowserAnimationsModule,
        NgxMaskModule.forRoot(maskConfig),
    ],
    declarations: [
        DynamicformComponent, 
        CardComponent, 
        DynamictableComponent, 
        CardSelectorItemComponent, 
        BusinessCardComponent,
        ProductCardComponent
    ],
    exports: [
        DynamicformComponent,
        CardComponent,
        DynamictableComponent,
        CardSelectorItemComponent,
        BusinessCardComponent,
        ProductCardComponent,
        BrowserModule,
        BrowserAnimationsModule,
    ]
})
export class SharedModule { }