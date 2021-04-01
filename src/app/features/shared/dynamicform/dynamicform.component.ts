import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DynamicForm } from 'src/app/core/models/dynamic-form.model';
import { AlertService } from 'src/app/core/services/alert.service';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dynamicform',
  templateUrl: './dynamicform.component.html',
  styleUrls: ['./dynamicform.component.scss']
})
export class DynamicformComponent implements OnInit {
  @Input() form: DynamicForm[]  
  @Input() formGroup: FormGroup;
  @Output() onSave: EventEmitter<any> = new EventEmitter<any>();

  @Input() oneColumn: Boolean = true;
  @Input() indexRoute: string;


  constructor(private _alertService:AlertService, private _router: Router) {
  }

  ngOnInit() {
  }  

  save(){
    const form = this.formGroup;    
    console.log(form, form.value)
    if(form.valid){                  
      this.onSave.emit(form.value);
    }else{
      this._alertService.ToasterNotification('Aviso','Favor completar los campos requeridos','info')
    }
  }  

  cancel(){
    this._router.navigate([this.indexRoute]);
  }
}
