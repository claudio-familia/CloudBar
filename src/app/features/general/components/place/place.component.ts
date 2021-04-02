import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/core/services/alert.service';
import { BaseComponent } from 'src/app/features/shared/base/base.component';
import { Place } from '../../models/place';
import { PlaceService } from '../../services/place.service';

@Component({
  selector: 'app-place',
  templateUrl: './place.component.html'  
})
export class PlaceComponent extends BaseComponent implements OnInit {

  places: Place[] = [];  
  tableSettings: any;  

  constructor(private _alertService: AlertService,
              private _placeService: PlaceService,
              private _router: Router) {
    super(_alertService)
   }  

  ngOnInit(): void {
    this.tableSettings = this.setTable(
      ['id', 'name', 'address', 'district', 'province', 'country', 'latitude', 'longitude'],
      ['#', 'Nombre', 'Dirección', 'Distrito', 'Provincia', 'Pais', 'Latitud', 'Longitud']);
    this.getData();
  }

  getData(){
    this._placeService.get().subscribe(res => this.places = res, err => this.getHttpErrorResponse(err));
  }

  editDelete(data: any){
    if(data.typeAction == 'edit')
      this._router.navigate(['places','edit', data.id]);
    else
      this.deleteRow(data.id);
  }

  deleteRow(id: any) {
    this._alertService.ModalNotification('¿Está seguro?', 'Esta a punto de borrar el siguiente registro...', 'question')
    .then(res => {
      if(res.isConfirmed){
        this._placeService.delete(id).subscribe(
          res => this._alertService.ToasterNotification('Operación exitosa', 'Lugar borrada correctamente', 'success'),
          err => this.getHttpErrorResponse(err)
        )
      }
    })
  }
}