import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AlertService } from "src/app/core/services/alert.service";
import { BaseComponent } from "src/app/features/shared/base/base.component";
import { Employee } from "../../models/employee";
import { EmployeeService } from "../../services/employee.service";

@Component({
    selector: 'app-employee',
    templateUrl: './employee.component.html'
})
export class EmployeeComponent extends BaseComponent implements OnInit {

    employees: Employee[] = [];
    tableSettings: any;

    constructor(private _alertService: AlertService,
        private _employeeService: EmployeeService,
        private _router: Router) {
        super(_alertService)
    }

    ngOnInit(): void {
        this.tableSettings = this.setTable(
            ['id', 'person',],
            ['#', 'Persona']);
        this.getData();
    }

    getData() {
        this._employeeService.get().subscribe(res => this.employees = res, err => this.getHttpErrorResponse(err));
    }

    editDelete(data: any) {
        if (data.typeAction == 'edit')
            this._router.navigate(['employees', 'edit', data.id]);
        else
            this.deleteRow(data.id);
    }

    deleteRow(id: any) {
        this._alertService.ModalNotification('¿Está seguro?', 'Esta a punto de borrar el siguiente registro...', 'question')
            .then(res => {
                if (res.isConfirmed) {
                    this._employeeService.delete(id).subscribe(
                        res => this._alertService.ToasterNotification('Operación exitosa', 'Empleado borrado correctamente', 'success'),
                        err => this.getHttpErrorResponse(err)
                    )
                }
            })
    }
}