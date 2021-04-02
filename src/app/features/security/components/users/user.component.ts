import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/core/services/alert.service';
import { BaseComponent } from 'src/app/features/shared/base/base.component';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html'  
})
export class UserComponent extends BaseComponent implements OnInit {

  users: User[] = [];  
  tableSettings: any;
  toggleInactive: boolean = false;

  constructor(private _alertService: AlertService,
              private _userService: UserService,
              private _router: Router) {
    super(_alertService)
   }  

  ngOnInit(): void {
    this.tableSettings = this.setTable(
      ['id', 'username', 'role', 'person'],
      ['#', 'Usuario', 'Role', 'Persona']);
    this.getData();
  }

  getData(){
    this._userService.get().subscribe(res => this.users = res, err => this.getHttpErrorResponse(err));
  }

  editDelete(data: any){
    if(data.typeAction == 'edit')
      this._router.navigate(['users','edit', data.id]);
    else
      this.deleteRow(data.id);
  }

  deleteRow(id: any) {
    this._alertService.ModalNotification('¿Está seguro?', 'Esta a punto de borrar el siguiente registro...', 'question')
    .then(res => {
      if(res.isConfirmed){
        this._userService.delete(id).subscribe(
          res => this._alertService.ToasterNotification('Operación exitosa', 'Usuario inactivado correctamente', 'success'),
          err => this.getHttpErrorResponse(err)
        )
      }
    })
  }
}
