import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/core/services/alert.service';
import { BaseComponent } from 'src/app/features/shared/base/base.component';
import { Item } from '../../models/item';
import { ItemService } from '../../services/item.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html'  
})
export class ItemComponent extends BaseComponent implements OnInit {

  items: Item[] = [];  
  tableSettings: any;
  toggleInactive: boolean = false;

  constructor(private _alertService: AlertService,
              private _itemService: ItemService,
              private _router: Router) {
    super(_alertService)
   }  

  ngOnInit(): void {
    this.tableSettings = this.setTable(
      ['category', 'name', 'description', 'stock', 'price'],
      ['Categoria', 'Nombre', 'Descripción', 'Disponible', 'Precio']);
    this.getData();
  }

  getData(){
    this._itemService.get().subscribe(res => this.items = res, err => this.getHttpErrorResponse(err));
  }

  editDelete(data: any){
    if(data.typeAction == 'edit')
      this._router.navigate(['items','edit', data.id]);
    else
      this.deleteRow(data.id);
  }

  deleteRow(id: any) {
    this._alertService.ModalNotification('¿Está seguro?', 'Esta a punto de borrar el siguiente registro...', 'question')
    .then(res => {
      if(res.isConfirmed){
        this._itemService.delete(id).subscribe(
          res => this._alertService.ToasterNotification('Operación exitosa', 'Articulo inactivado correctamente', 'success'),
          err => this.getHttpErrorResponse(err)
        )
      }
    })
  }
}
