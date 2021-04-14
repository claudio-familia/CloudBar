import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DynamicForm } from 'src/app/core/models/dynamic-form.model';
import { AlertService } from 'src/app/core/services/alert.service';
import { PeopleService } from 'src/app/features/general/services/people.service';
import { BaseComponent } from 'src/app/features/shared/base/base.component';
import { Employee } from '../../../models/employee';
import { EmployeeService } from '../../../services/employee.service';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee.form.component.html'
})
export class EmployeeFormComponent extends BaseComponent implements OnInit {

  form: DynamicForm[];
  formGroup: FormGroup;
  employeeId: string;
  loadForm: boolean = false;
  selectedEmployee: Employee;
  people: any[] = [];
  peopleFiltered: any[] = [];

  constructor(private _alertService: AlertService,
    private _employeeService: EmployeeService,
    private _peopleService: PeopleService,
    private _currentRoute: ActivatedRoute,
    private _router: Router) {
    super(_alertService)
  }

  async ngOnInit(): Promise<void> {
    await this.getPeople();
    this._currentRoute.params.subscribe(async param => {
      this.employeeId = param.id;

      if (this.employeeId) {
        await this.getClient();
      }

      this.FORM[0].valueArray = this.people;
      this.FORM[0].valueFiltered = this.peopleFiltered;

      this.form = [...this.FORM];

      this.formGroup = this.getFormGroup(this.form);
    });
  }

  async getClient() {
    await this._employeeService.getById(this.employeeId).toPromise().then(
      res => {
        this.selectedEmployee = res;
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
    if (this.employeeId) {
      const employee: Employee = {
        ...this.selectedEmployee,
        ...data,
      }
      this._employeeService.update(employee).subscribe(
        res => {
          this._alertService.ToasterNotification('Operación exitosa', 'Empleado actalizado correctamente', 'success');
          this._router.navigate(['employees']);
        }
      );
    } else {
      this._employeeService.create(data).subscribe(
        res => {
          this._alertService.ToasterNotification('Operación exitosa', 'Empleado creado correctamente', 'success');
          this._router.navigate(['employees']);
        },
        err => this.getHttpErrorResponse(err)
      );
    }
  }

  get endPath() { return this.employeeId ? this.employeeId : 'Nueva'; }
  get subtitle() { return 'Inicio / Empleados / ' + this.endPath };
  get title() { return this.employeeId ? 'Editar empleado #' + this.employeeId : 'Nuevo empleado' }

  FORM: DynamicForm[] = [
    {
      name: 'personId',
      value: '',
      label: 'Seleccione la persona.',
      type: 'select',
      placeholder: 'Seleccione la persona a crear como empleado',
      isRequired: true,
      valueArray: this.people,
      valueFiltered: this.peopleFiltered
    }
  ]
  
  setFormValue(res: Employee) {
    this.FORM.forEach(item => {
      if (item.name === 'personId') item.value = res.personId;
    })
  }
}