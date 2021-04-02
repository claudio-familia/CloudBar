import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DynamicForm } from 'src/app/core/models/dynamic-form.model';
import { AlertService } from 'src/app/core/services/alert.service';
import { BaseComponent } from 'src/app/features/shared/base/base.component';
import { Parameter } from '../../../models/parameter';
import { ParameterService } from '../../../services/parameter.service';

@Component({
  selector: 'app-parameter-form',
  templateUrl: './parameter.form.component.html'
})
export class ParameterFormComponent extends BaseComponent implements OnInit {

  form: DynamicForm[];
  formGroup: FormGroup;
  parameterId: string;
  loadForm: boolean = false;
  selectedParameter: Parameter;

  constructor(private _alertService: AlertService,
    private _parameterService: ParameterService,
    private _currentRoute: ActivatedRoute,
    private _router: Router) {
    super(_alertService)
  }

  ngOnInit(): void {
    this._currentRoute.params.subscribe(async param => {
      this.parameterId = param.id;

      if (this.parameterId) {
        await this.getParameter();
      }

      this.form = [...FORM];

      this.formGroup = this.getFormGroup(this.form);
    });
  }

  async getParameter() {
    await this._parameterService.getById(this.parameterId).toPromise().then(
      res => {
        this.selectedParameter = res;
        setFormValue(res);
      }
    )
  }

  createUpdateData(data: any) {
    data.value = Number(data.value);
    if (this.parameterId) {
      const parameter: Parameter = {
        ...this.selectedParameter,
        ...data,
      }
      this._parameterService.update(parameter).subscribe(
        res => {
          this._alertService.ToasterNotification('Operación exitosa', 'Parametro actalizada correctamente', 'success');
          this._router.navigate(['parameters']);
        }
      );
    } else {
      this._parameterService.create(data).subscribe(
        res => {
          this._alertService.ToasterNotification('Operación exitosa', 'Parametro creada correctamente', 'success');
          this._router.navigate(['parameters']);
        },
        err => this.getHttpErrorResponse(err)
      );
    }
  }

  get endPath() { return this.parameterId ? this.parameterId : 'Nueva'; }
  get subtitle() { return 'Inicio / Parametros / ' + this.endPath };
  get title() { return this.parameterId ? 'Editar parametro #' + this.parameterId : 'Nuevo parametro' }

}

const FORM: DynamicForm[] = [
  {
    name: 'name',
    value: '',
    label: 'Nombre',
    type: 'text',
    placeholder: 'Digete el nombre del parametro',
    isRequired: true
  },
  {
    name: 'description',
    value: '',
    label: 'Descripción',
    type: 'text',
    placeholder: 'Digete la descripción del parametro',
  },
  {
    name: 'isPercent',
    value: false,
    label: '¿Es un porcentaje?',
    type: 'checkbox',
    isRequired: true
  },
  {
    name: 'value',
    value: '',
    label: 'Valor',
    type: 'number',
    placeholder: 'Digete el valor del parametro a considerar',
    isRequired: true
  }
]

function setFormValue(res: Parameter) {
  FORM.forEach(item => {
    if (item.name === 'name') item.value = res.name;
    if (item.name === 'description') item.value = res.description;
    if (item.name === 'isPercent') item.value = res.isPercent;
    if (item.name === 'value') item.value = res.value;
  })
}
