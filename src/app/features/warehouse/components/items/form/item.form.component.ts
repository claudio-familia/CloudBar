import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DynamicForm } from 'src/app/core/models/dynamic-form.model';
import { AlertService } from 'src/app/core/services/alert.service';
import { FirebaseService } from 'src/app/core/services/firebase.service';
import { BaseComponent } from 'src/app/features/shared/base/base.component';
import { Category } from '../../../models/category';
import { Item } from '../../../models/item';
import { CategoryService } from '../../../services/category.service';
import { ItemService } from '../../../services/item.service';

@Component({
  selector: 'app-item-form',
  templateUrl: './item.form.component.html'
})
export class ItemFormComponent extends BaseComponent implements OnInit {

  form: DynamicForm[];
  formGroup: FormGroup;
  itemId: string;
  loadForm: boolean = false;
  selectedItem: Item;
  image: any;
  selectedImage: any;
  categories: Category[] = [];
  categoriesFiltered: Category[] = [];

  constructor(private _alertService: AlertService,
    private _itemService: ItemService,
    private _categoryService: CategoryService,
    private _fireBaseService: FirebaseService,
    private _currentRoute: ActivatedRoute,
    private _router: Router) {
    super(_alertService)
  }

  async ngOnInit(): Promise<void> {
    await this.getCategories();
    this._currentRoute.params.subscribe(async param => {
      this.itemId = param.id;

      if (this.itemId) {
        await this.getItem();
      }

      this.FORM[0].valueArray = this.categories;
      this.FORM[0].valueFiltered = this.categoriesFiltered;

      this.form = [...this.FORM];

      this.formGroup = this.getFormGroup(this.form);
    });
  }
  async getCategories() {
    await this._categoryService.get().toPromise().then((res) => {
      this.categories = [...res];
      this.categoriesFiltered = [...this.categories]
    })
  }

  async getItem() {
    await this._itemService.getById(this.itemId).toPromise().then(
      res => {
        this.selectedItem = res;
        this.image = res.imgUrl;
        this.setFormValue(res);
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
    data.price = Number(data.price);
    data.stock = Number(data.stock)  
    if (this.itemId) {
      await this.updatedItem(data);
    } else {             
      this.createItem(data);
    }
  }

  private async updatedItem(data: any) {
    const item: Item = {
      ...this.selectedItem,
      ...data,
    };
    if (this.selectedImage && this.image) {
      await this._fireBaseService.saveFileToStorage(`${this.itemId}`, this.selectedImage)
        .then((fileUploaded) => {
          item.imgUrl = fileUploaded;
        });
    }
    this._itemService.update(item).subscribe(
      res => {
        this._alertService.ToasterNotification('Operación exitosa', 'Articulo actalizado correctamente', 'success');
        this._router.navigate(['items']);
      }
    );
  }

  private createItem(data: any) {
    this._itemService.create(data).subscribe(
      res => {
        this._fireBaseService.saveFileToStorage(`${res['id']}`, this.selectedImage).then((fileUploaded) => {
          res['imgUrl'] = fileUploaded;
          this._itemService.update(res).subscribe(() => {
            this._alertService.ToasterNotification('Operación exitosa', 'Articulo creado correctamente', 'success');
            this._router.navigate(['items']);
          });
        });
      },
      err => this.getHttpErrorResponse(err)
    );
  }

  get endPath() { return this.itemId ? this.itemId : 'Nueva'; }
  get subtitle() { return 'Inicio / Articulos / ' + this.endPath };
  get title() { return this.itemId ? 'Editar articulo #' + this.itemId : 'Nuevo articulo' }

  FORM: DynamicForm[] = [
    {
      name: 'categoryId',
      value: '',
      label: 'Categoria',
      type: 'select',
      placeholder: 'Seleccione la categoria del articulo',
      isRequired: true,
      valueArray: this.categories,
      valueFiltered: this.categoriesFiltered
    },
    {
      name: 'name',
      value: '',
      label: 'Nombre',
      type: 'text',
      placeholder: 'Digite el nombre del articulo',
      isRequired: true,
    },
    {
      name: 'description',
      value: '',
      label: 'Descripción',
      type: 'text',
      placeholder: 'Digite la descripción del articulo',
    },
    {
      name: 'price',
      value: 0,
      label: 'Precio',
      type: 'number',
      placeholder: 'Digite el precio del articulo',
    },
    {
      name: 'stock',
      value: 0,
      label: 'Stock',
      type: 'number',
      placeholder: 'Digite el stock del articulo',
    },
    {
      name: 'imgUrl',
      value: '',
      label: 'Imagen',
      type: 'file',
      placeholder: 'Suba la imagen del articulo',
    }
  ]
  
  setFormValue(res: Item) {
    this.FORM.forEach(item => {
      if (item.name === 'name') item.value = res.name;
      if (item.name === 'description') item.value = res.description;
      if (item.name === 'stock') item.value = res.stock;
      if (item.name === 'price') item.value = res.price;
      if (item.name === 'categoryId') item.value = res.categoryId;
    })
  }
}

