import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { DynamicForm } from 'src/app/core/models/dynamic-form.model';
import { AlertService } from 'src/app/core/services/alert.service';
import { FirebaseService } from 'src/app/core/services/firebase.service';
import { AppState } from 'src/app/core/store/app.state';
import { Place } from 'src/app/features/general/models/place';
import { getCurrentPlace } from 'src/app/features/security/state/security.selector';
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
  image: any;
  selectedImage: any;
  currentPlace$: any;
  currentPlace: Place;

  constructor(private _alertService: AlertService,
    private _categoryService: CategoryService,
    private _fireBaseService: FirebaseService,
    private _currentRoute: ActivatedRoute,
    private _store: Store<AppState>,
    private _router: Router) {
    super(_alertService)
    this.currentPlace$ = this._store.pipe(select(getCurrentPlace));
  }

  ngOnInit(): void {
    this.currentPlace$.subscribe(
      res => {
        this.currentPlace = res;
      }
    )
    this._currentRoute.params.subscribe(async param => {
      this.categoryId = param.id;

      if (this.categoryId) {
        await this.getCategory();
      }

      this.form = [...FORM];

      this.formGroup = this.getFormGroup(this.form);
    });
  }

  async getCategory() {
    await this._categoryService.getById(this.categoryId).toPromise().then(
      res => {
        this.selectedCategory = res;
        this.image = res.imgUrl;
        setFormValue(res);
      }
    )
  }

  setImage(data: any){
    let reader = new FileReader();

    reader.readAsDataURL(data);

    this.selectedImage = data;

    reader.onload = () => {
      this.image = reader.result;
    }
  }

  async createUpdateData(data: any) {    
    if (this.categoryId) {
      if(data.imgUrl == '') delete data.imgUrl;
      const category: Category = {
        ...this.selectedCategory,
        ...data,
      }
      if(this.selectedImage && this.image){
        await this._fireBaseService.saveFileToStorage(`category-${this.categoryId}`, this.selectedImage)
        .then((fileUploaded) => {
          category.imgUrl = fileUploaded;
        });
      }
      this._categoryService.update(category).subscribe(
        res => {
          this._alertService.ToasterNotification('Operación exitosa', 'Categoria actalizado correctamente', 'success');
          this._router.navigate(['categories']);
        }
      );
    } else {             
      this.createCategory(data);
    }
  }

  private createCategory(data: any) {
    data.placeId = this.currentPlace.id;
    this._categoryService.create(data).subscribe(
      res => {
        this._fireBaseService.saveFileToStorage(`category-${res['id']}`, this.selectedImage).then((fileUploaded) => {
          res['imgUrl'] = fileUploaded;
          this._categoryService.update(res).subscribe(() => {
            this._alertService.ToasterNotification('Operación exitosa', 'Categoria creado correctamente', 'success');
            this._router.navigate(['categories']);
          });
        });
      },
      err => this.getHttpErrorResponse(err)
    );
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
    placeholder: 'Digite el nombre de la categoria',
    isRequired: true
  },
  {
    name: 'description',
    value: '',
    label: 'Descripción',
    type: 'text',
    placeholder: 'Digite la descripción de la categoria',
  },
  {
    name: 'imgUrl',
    value: '',
    label: 'Imagen',
    type: 'file',
    placeholder: 'Suba la imagen de la categoria',
  }
]

function setFormValue(res: Category) {
  FORM.forEach(item => {
    if (item.name === 'name') item.value = res.name;
    if (item.name === 'description') item.value = res.description;
  })
}
