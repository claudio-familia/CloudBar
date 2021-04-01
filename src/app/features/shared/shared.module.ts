import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { CoreModule } from "src/app/core/core.module";
import { DynamicformComponent } from "./dynamicform/dynamicform.component";
import { CardComponent } from './card/card.component';
import { RouterModule } from "@angular/router";
import { DynamictableComponent } from "./dynamictable/dynamictable.component";
import { NgxMaskModule, IConfig } from 'ngx-mask'

const maskConfig: Partial<IConfig> = {
    validation: false,
};

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        CoreModule,
        RouterModule,
        NgxMaskModule.forRoot(maskConfig),
    ],
    declarations: [DynamicformComponent, CardComponent, DynamictableComponent],
    exports: [
        DynamicformComponent,
        CardComponent,
        DynamictableComponent]
})
export class SharedModule { }