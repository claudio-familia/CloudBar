import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { DynamicForm } from 'src/app/core/models/dynamic-form.model';
import { AlertService } from 'src/app/core/services/alert.service';
import { AppState } from 'src/app/core/store/app.state';
import { Place } from 'src/app/features/general/models/place';
import { PeopleService } from 'src/app/features/general/services/people.service';
import { getCurrentPlace } from 'src/app/features/security/state/security.selector';
import { BaseComponent } from 'src/app/features/shared/base/base.component';
import { Client } from '../../../models/client';
import { ClientService } from '../../../services/client.service';

@Component({
  selector: 'app-client-form',
  templateUrl: './client.form.component.html'
})
export class ClientFormComponent extends BaseComponent implements OnInit {

  form: DynamicForm[];
  formGroup: FormGroup;
  clientId: string;
  loadForm: boolean = false;
  selectedClient: Client;
  people: any[] = [];
  peopleFiltered: any[] = [];
  currentPlace$: any;
  currentPlace: Place;

  constructor(private _alertService: AlertService,
    private _clientService: ClientService,
    private _peopleService: PeopleService,
    private _currentRoute: ActivatedRoute,
    private _store: Store<AppState>,
    private _router: Router) {
    super(_alertService)
    this.currentPlace$ = this._store.pipe(select(getCurrentPlace));
  }

  async ngOnInit(): Promise<void> {
    this.currentPlace$.subscribe(
      res => {
        this.currentPlace = res;
      }
    )
    await this.getPeople();
    this._currentRoute.params.subscribe(async param => {
      this.clientId = param.id;

      if (this.clientId) {
        await this.getClient();
      }

      this.FORM[0].valueArray = this.people;
      this.FORM[0].valueFiltered = this.peopleFiltered;

      this.form = [...this.FORM];

      this.formGroup = this.getFormGroup(this.form);
    });
  }

  async getClient() {
    await this._clientService.getById(this.clientId).toPromise().then(
      res => {
        this.selectedClient = res;
        this.setFormValue(res);
      }
    )
  }

  async getPeople(){
    await this._peopleService.get().toPromise().then(
      res => {
        this.people = res;
        this.peopleFiltered = [...res];
      }
    )
  }

  createUpdateData(data: any) {
    data.value = Number(data.value);
    if (this.clientId) {
      const client: Client = {
        ...this.selectedClient,
        ...data,
      }
      this._clientService.update(client).subscribe(
        res => {
          this._alertService.ToasterNotification('Operación exitosa', 'Cliente actalizado correctamente', 'success');
          this._router.navigate(['clients']);
        }
      );
    } else {
      data.placeId = this.currentPlace.id
      this._clientService.create(data).subscribe(
        res => {
          this._alertService.ToasterNotification('Operación exitosa', 'Cliente creado correctamente', 'success');
          this._router.navigate(['clients']);
        },
        err => this.getHttpErrorResponse(err)
      );
    }
  }

  get endPath() { return this.clientId ? this.clientId : 'Nueva'; }
  get subtitle() { return 'Inicio / Clientes / ' + this.endPath };
  get title() { return this.clientId ? 'Editar cliente #' + this.clientId : 'Nuevo cliente' }

  FORM: DynamicForm[] = [
    {
      name: 'personId',
      value: '',
      label: 'Seleccione la persona.',
      type: 'select',
      placeholder: 'Seleccione la persona a crear como cliente',
      isRequired: true,
      valueArray: this.people,
      valueFiltered: this.peopleFiltered
    }
  ]
  
  setFormValue(res: Client) {
    this.FORM.forEach(item => {
      if (item.name === 'personId') item.value = res.personId;
    })
  }
}