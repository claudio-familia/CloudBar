import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DynamicForm } from 'src/app/core/models/dynamic-form.model';
import { AlertService } from 'src/app/core/services/alert.service';
import { BaseComponent } from 'src/app/features/shared/base/base.component';
import { Parameter } from '../../../models/parameter';
import { Place } from '../../../models/place';
import { ParameterService } from '../../../services/parameter.service';
import { PlaceService } from '../../../services/place.service';

@Component({
  selector: 'app-place-form',
  templateUrl: './place.form.component.html'
})
export class PlaceFormComponent extends BaseComponent implements OnInit {

  form: DynamicForm[];
  formGroup: FormGroup;
  placeId: string;
  loadForm: boolean = false;
  selectedPlace: Place;

  constructor(private _alertService: AlertService,
    private _placeService: PlaceService,
    private _currentRoute: ActivatedRoute,
    private _router: Router) {
    super(_alertService)
  }

  ngOnInit(): void {
    this._currentRoute.params.subscribe(async param => {
      this.placeId = param.id;

      if (this.placeId) {
        await this.getPlace();
      }

      this.form = [...FORM];

      this.formGroup = this.getFormGroup(this.form);
    });
  }

  async getPlace() {
    await this._placeService.getById(this.placeId).toPromise().then(
      res => {
        this.selectedPlace = res;
        setFormValue(res);
      }
    )
  }

  createUpdateData(data: any) {
    if (this.placeId) {
      const place: Place = {
        ...this.selectedPlace,
        ...data,
      }
      this._placeService.update(place).subscribe(
        res => {
          this._alertService.ToasterNotification('Operación exitosa', 'Lugar actalizada correctamente', 'success');
          this._router.navigate(['places']);
        }
      );
    } else {
      this._placeService.create(data).subscribe(
        res => {
          this._alertService.ToasterNotification('Operación exitosa', 'Lugar creada correctamente', 'success');
          this._router.navigate(['places']);
        },
        err => this.getHttpErrorResponse(err)
      );
    }
  }

  get endPath() { return this.placeId ? this.placeId : 'Nueva'; }
  get subtitle() { return 'Inicio / Lugares / ' + this.endPath };
  get title() { return this.placeId ? 'Editar lugar #' + this.placeId : 'Nuevo lugar' }

}

const FORM: DynamicForm[] = [
  {
    name: 'name',
    value: '',
    label: 'Nombre',
    type: 'text',
    placeholder: 'Digete el nombre del lugar',
    isRequired: true
  },
  {
    name: 'address',
    value: '',
    label: 'Dirección',
    type: 'text',
    placeholder: 'Digete la dirección del lugar',
  },
  {
    name: 'district',
    value: '',
    label: 'Distrito o ciudad',
    type: 'text',
    placeholder: 'Digete el distrito o ciudad del lugar',
  },
  {
    name: 'province',
    value: '',
    label: 'Provincia o Estado',
    type: 'text',
    placeholder: 'Digete la provincia o estado del lugar',
  },
  {
    name: 'country',
    value: '',
    label: 'Pais',
    type: 'text',
    placeholder: 'Digete el pais del lugar',
    isRequired: true
  },
  {
    name: 'latitude',
    value: '',
    label: 'Latitude',
    type: 'text',
    placeholder: 'Digete la latitude del lugar',
  },
  {
    name: 'longitude',
    value: '',
    label: 'Longitud',
    type: 'text',
    placeholder: 'Digete la longitud del lugar',
  },
]

function setFormValue(res: Place) {
  FORM.forEach(item => {
    if (item.name === 'name') item.value = res.name;
    if (item.name === 'address') item.value = res.address;
    if (item.name === 'district') item.value = res.district;
    if (item.name === 'province') item.value = res.province;
    if (item.name === 'country') item.value = res.country;
    if (item.name === 'latitude') item.value = res.latitude;
    if (item.name === 'longitude') item.value = res.longitude;
  })
}
