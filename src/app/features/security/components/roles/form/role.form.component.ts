import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DynamicForm } from 'src/app/core/models/dynamic-form.model';
import { AlertService } from 'src/app/core/services/alert.service';
import { BaseComponent } from 'src/app/features/shared/base/base.component';
import { Role } from '../../../models/role';
import { RoleService } from '../../../services/role.service';

@Component({
  selector: 'app-role-form',
  templateUrl: './role.form.component.html'
})
export class RoleFormComponent extends BaseComponent implements OnInit {

  form: DynamicForm[];
  formGroup: FormGroup;
  roleId: string;
  loadForm: boolean = false;
  selectedRole: Role;

  constructor(private _alertService: AlertService,
    private _roleService: RoleService,
    private _currentRoute: ActivatedRoute,
    private _router: Router) {
    super(_alertService)
  }

  ngOnInit(): void {
    this._currentRoute.params.subscribe(async param => {
      this.roleId = param.id;

      if (this.roleId) {
        await this.getParameter();
      }

      this.form = [...FORM];

      this.formGroup = this.getFormGroup(this.form);
    });
  }

  async getParameter() {
    await this._roleService.getById(this.roleId).toPromise().then(
      res => {
        this.selectedRole = res;
        setFormValue(res);
      }
    )
  }

  createUpdateData(data: any) {    
    if (this.roleId) {
      const role: Role = {
        ...this.selectedRole,
        ...data,
      }
      this._roleService.update(role).subscribe(
        res => {
          this._alertService.ToasterNotification('Operación exitosa', 'Rol actalizado correctamente', 'success');
          this._router.navigate(['roles']);
        }
      );
    } else {
      this._roleService.create(data).subscribe(
        res => {
          this._alertService.ToasterNotification('Operación exitosa', 'Rol creado correctamente', 'success');
          this._router.navigate(['roles']);
        },
        err => this.getHttpErrorResponse(err)
      );
    }
  }

  get endPath() { return this.roleId ? this.roleId : 'Nueva'; }
  get subtitle() { return 'Inicio / Roles / ' + this.endPath };
  get title() { return this.roleId ? 'Editar rol #' + this.roleId : 'Nuevo rol' }

}

const FORM: DynamicForm[] = [
  {
    name: 'name',
    value: '',
    label: 'Nombre',
    type: 'text',
    placeholder: 'Digete el nombre del rol',
    isRequired: true
  },
  {
    name: 'description',
    value: '',
    label: 'Descripción',
    type: 'text',
    placeholder: 'Digete la descripción del rol',
  }
]

function setFormValue(res: Role) {
  FORM.forEach(item => {
    if (item.name === 'name') item.value = res.name;
    if (item.name === 'description') item.value = res.description;
  })
}
