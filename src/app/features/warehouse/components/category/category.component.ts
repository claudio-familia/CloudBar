import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/core/services/alert.service';
import { BaseComponent } from 'src/app/features/shared/base/base.component';
import { Category } from '../../models/category';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html'  
})
export class CategoryComponent extends BaseComponent implements OnInit {

  categories: Category[] = [];  
  tableSettings: any;
  toggleInactive: boolean = false;

  constructor(private _alertService: AlertService,
              private _categoryService: CategoryService,
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
    this._categoryService.get().subscribe(res => this.categories = res, err => this.getHttpErrorResponse(err));
  }

  editDelete(data: any){
    if(data.typeAction == 'edit')
      this._router.navigate(['categories','edit', data.id]);
    else
      this.deleteRow(data.id);
  }

  deleteRow(id: any) {
    this._alertService.ModalNotification('¿Está seguro?', 'Esta a punto de borrar el siguiente registro...', 'question')
    .then(res => {
      if(res.isConfirmed){
        this._categoryService.delete(id).subscribe(
          res => this._alertService.ToasterNotification('Operación exitosa', 'Categoria inactivado correctamente', 'success'),
          err => this.getHttpErrorResponse(err)
        )
      }
    })
  }
}
