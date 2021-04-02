import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/core/services/alert.service';
import { BaseComponent } from 'src/app/features/shared/base/base.component';
import { Role } from '../../models/role';
import { RoleService } from '../../services/role.service';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html'  
})
export class RoleComponent extends BaseComponent implements OnInit {

  roles: Role[] = [];  
  tableSettings: any;
  toggleInactive: boolean = false;

  constructor(private _alertService: AlertService,
              private _roleService: RoleService,
              private _router: Router) {
    super(_alertService)
   }  

  ngOnInit(): void {
    this.tableSettings = this.setTable(
      ['id', 'name', 'description'],
      ['#', 'Nombre', 'Descripción']);
    this.getData();
  }

  getData(){
    this._roleService.get().subscribe(res => this.roles = res, err => this.getHttpErrorResponse(err));
  }

  editDelete(data: any){
    if(data.typeAction == 'edit')
      this._router.navigate(['roles','edit', data.id]);
    else
      this.deleteRow(data.id);
  }

  deleteRow(id: any) {
    this._alertService.ModalNotification('¿Está seguro?', 'Esta a punto de borrar el siguiente registro...', 'question')
    .then(res => {
      if(res.isConfirmed){
        this._roleService.delete(id).subscribe(
          res => this._alertService.ToasterNotification('Operación exitosa', 'Role inactivado correctamente', 'success'),
          err => this.getHttpErrorResponse(err)
        )
      }
    })
  }
}
