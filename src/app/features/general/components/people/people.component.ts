import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent } from 'src/app/features/shared/base/base.component';
import { AlertService } from 'src/app/core/services/alert.service';
import { Person } from '../../models/person';
import { PeopleService } from '../../services/people.service';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styles: ['']
})
export class PeopleComponent extends BaseComponent implements OnInit {
  
  people: Person[] = [];  
  tableSettings: any;  

  constructor(private _alertService: AlertService, 
              private _peopleService: PeopleService,
              private _router: Router)
  { super(_alertService); }

  ngOnInit(): void {
    this.tableSettings = this.setTable(
      ['id', 'name', 'lastName', 'identification', 'datebirth'],
      ['#', 'Nombre', 'Apellido', 'Cédula', 'Fecha de nacimiento']);
    this.getPeople();
  }

  getPeople(){
    this._peopleService.get().subscribe(res => this.people = res, err => this.getHttpErrorResponse(err));
  }

  editDelete(data: any){
    if(data.typeAction == 'edit')
      this._router.navigate(['people','edit', data.id]);
    else
      this.deletePerson(data.id);
  }

  deletePerson(id: any) {
    this._peopleService.delete(id).subscribe(
      res => this._alertService.ToasterNotification('Operación exitosa', 'Persona borrada correctamente', 'success'),
      err => this.getHttpErrorResponse(err)
    )
  }

}
