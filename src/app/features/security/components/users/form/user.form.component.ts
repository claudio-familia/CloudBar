import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DynamicForm } from 'src/app/core/models/dynamic-form.model';
import { AlertService } from 'src/app/core/services/alert.service';
import { Person } from 'src/app/features/general/models/person';
import { PeopleService } from 'src/app/features/general/services/people.service';
import { BaseComponent } from 'src/app/features/shared/base/base.component';
import { Role } from '../../../models/role';
import { User } from '../../../models/user';
import { RoleService } from '../../../services/role.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user.form.component.html'
})
export class UserFormComponent extends BaseComponent implements OnInit {

  form: DynamicForm[];
  formGroup: FormGroup;
  userId: string;
  loadForm: boolean = false;
  selectedUser: User;
  roles: Role[];
  people:Person[];

  constructor(private _alertService: AlertService,
    private _userService: UserService,
    private _roleService: RoleService,
    private _peopleService: PeopleService,
    private _currentRoute: ActivatedRoute,
    private _router: Router) {
    super(_alertService)
  }

  async ngOnInit(): Promise<void> {
    await this.getRoles();
    await this.getPeople();
    this._currentRoute.params.subscribe(async param => {
      this.userId = param.id;

      if (this.userId) {
        await this.getParameter();
      }

      FORM[0].valueArray = this.roles;
      FORM[0].valueFiltered = [...this.roles];
      FORM[1].valueArray = this.people;
      FORM[1].valueFiltered = [...this.people];

      this.form = [...FORM];

      this.formGroup = this.getFormGroup(this.form);
    });
  }
  async getPeople() {
    await this._peopleService.get().toPromise().then(
      res => {
        this.people = res;
      }
    );
  }

  async getRoles() {
    await this._roleService.get().toPromise().then(
      res => {
        this.roles = res;
      }
    );
  }

  async getParameter() {
    await this._userService.getById(this.userId).toPromise().then(
      res => {
        this.selectedUser = res;
        setFormValue(res);
      }
    )
  }

  createUpdateData(data: any) {    
    if (this.userId) {
      const user: User = {
        ...this.selectedUser,
        ...data,
      }
      this._userService.update(user).subscribe(
        res => {
          this._alertService.ToasterNotification('Operación exitosa', 'Usuario actalizado correctamente', 'success');
          this._router.navigate(['users']);
        }
      );
    } else {
      this._userService.create(data).subscribe(
        res => {
          this._alertService.ToasterNotification('Operación exitosa', 'Usuario creado correctamente', 'success');
          this._router.navigate(['users']);
        },
        err => this.getHttpErrorResponse(err)
      );
    }
  }

  get endPath() { return this.userId ? this.userId : 'Nueva'; }
  get subtitle() { return 'Inicio / Usuarios / ' + this.endPath };
  get title() { return this.userId ? 'Editar usuario #' + this.userId : 'Nuevo usuario' }

}

const FORM: DynamicForm[] = [
  {
    name: 'roleId',
    value: '',
    label: 'Role',
    placeholder: 'Seleccione el rol del usuario',
    type: 'select',
    isRequired: true
  },
  {
    name: 'personId',
    value: '',
    label: 'Persona',
    type: 'select',
    placeholder: 'Seleccione la persona del usuario',
    isRequired: true
  },
  {
    name: 'username',
    value: '',
    label: 'Nombre de usuario',
    type: 'text',
    placeholder: 'Digete el nombre del usuario',
    isRequired: true
  },
  {
    name: 'password',
    value: '',
    label: 'Contraseña',
    type: 'text',
    placeholder: 'Digete la contraseña del usuario',
  },
  {
    name: 'confirmPassword',
    value: '',
    label: 'Confirmar contraseña',
    type: 'text',
    placeholder: 'Digete la contraseña del usuario',
  },  
]

function setFormValue(res: User) {
  FORM.forEach(item => {
    if (item.name === 'username') item.value = res.username;
    if (item.name === 'password') item.value = res.password;
    if (item.name === 'confirmPassword') item.value = res.confirmPassword;
    if (item.name === 'roleId') item.value = res.roleId;
    if (item.name === 'personId') item.value = res.personId;
  })
}
