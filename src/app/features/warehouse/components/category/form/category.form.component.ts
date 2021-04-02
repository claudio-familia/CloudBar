import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DynamicForm } from 'src/app/core/models/dynamic-form.model';
import { AlertService } from 'src/app/core/services/alert.service';
import { BaseComponent } from 'src/app/features/shared/base/base.component';
import { Category } from '../../../models/category';
import { CategoryService } from '../../../services/category.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category.form.component.html'
})
export class CategoryFormComponent extends BaseComponent implements OnInit {

  form: DynamicForm[];
  formGroup: FormGroup;
  categoryId: string;
  loadForm: boolean = false;
  selectedCategory: Category;

  constructor(private _alertService: AlertService,
    private _categoryService: CategoryService,
    private _currentRoute: ActivatedRoute,
    private _router: Router) {
    super(_alertService)
  }

  ngOnInit(): void {
    this._currentRoute.params.subscribe(async param => {
      this.categoryId = param.id;

      if (this.categoryId) {
        await this.getParameter();
      }

      this.form = [...FORM];

      this.formGroup = this.getFormGroup(this.form);
    });
  }

  async getParameter() {
    await this._categoryService.getById(this.categoryId).toPromise().then(
      res => {
        this.selectedCategory = res;
        setFormValue(res);
      }
    )
  }

  createUpdateData(data: any) {    
    if (this.categoryId) {
      const role: Category = {
        ...this.selectedCategory,
        ...data,
      }
      this._categoryService.update(role).subscribe(
        res => {
          this._alertService.ToasterNotification('Operación exitosa', 'Categoria actalizado correctamente', 'success');
          this._router.navigate(['categories']);
        }
      );
    } else {
      this._categoryService.create(data).subscribe(
        res => {
          this._alertService.ToasterNotification('Operación exitosa', 'Categoria creado correctamente', 'success');
          this._router.navigate(['categories']);
        },
        err => this.getHttpErrorResponse(err)
      );
    }
  }

  get endPath() { return this.categoryId ? this.categoryId : 'Nueva'; }
  get subtitle() { return 'Inicio / Categorias / ' + this.endPath };
  get title() { return this.categoryId ? 'Editar categoria #' + this.categoryId : 'Nuevo categoria' }

}

const FORM: DynamicForm[] = [
  {
    name: 'name',
    value: '',
    label: 'Nombre',
    type: 'text',
    placeholder: 'Digete el nombre de la categoria',
    isRequired: true
  },
  {
    name: 'description',
    value: '',
    label: 'Descripción',
    type: 'text',
    placeholder: 'Digete la descripción de la categoria',
  }
]

function setFormValue(res: Category) {
  FORM.forEach(item => {
    if (item.name === 'name') item.value = res.name;
    if (item.name === 'description') item.value = res.description;
  })
}
