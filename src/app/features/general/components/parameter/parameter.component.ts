import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/core/services/alert.service';
import { BaseComponent } from 'src/app/features/shared/base/base.component';
import { Parameter } from '../../models/parameter';
import { ParameterService } from '../../services/parameter.service';

@Component({
  selector: 'app-parameter',
  templateUrl: './parameter.component.html'  
})
export class ParameterComponent extends BaseComponent implements OnInit {

  parameters: Parameter[] = [];  
  tableSettings: any;  

  constructor(private _alertService: AlertService,
              private _parameterService: ParameterService,
              private _router: Router) {
    super(_alertService)
   }  

  ngOnInit(): void {
    this.tableSettings = this.setTable(
      ['id', 'name', 'description', 'isPercent', 'value'],
      ['#', 'Nombre', 'Descripción', 'Porcentaje', 'Valor']);
    this.getData();
  }

  getData(){
    this._parameterService.get().subscribe(res => this.parameters = res, err => this.getHttpErrorResponse(err));
  }

  editDelete(data: any){
    if(data.typeAction == 'edit')
      this._router.navigate(['parameters','edit', data.id]);
    else
      this.deleteRow(data.id);
  }

  deleteRow(id: any) {
    this._alertService.ModalNotification('¿Está seguro?', 'Esta a punto de borrar el siguiente registro...', 'question')
    .then(res => {
      if(res.isConfirmed){
        this._parameterService.delete(id).subscribe(
          res => this._alertService.ToasterNotification('Operación exitosa', 'Parametro borrada correctamente', 'success'),
          err => this.getHttpErrorResponse(err)
        )
      }
    })
  }
}
