import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-base-form',
  template: `    
    <app-dynamicform [form]="form" (onSave)="save($event)"></app-dynamicform>    
  `,  
})
export class BaseFormComponent {
    @Input() form:any
    @Input() title:any
    @Output() dataEmitter:EventEmitter<any> = new EventEmitter<any>();
        
    constructor() {                
    }

    save(data: any){     
        this.dataEmitter.emit(data);
    }
}