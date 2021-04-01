import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { BaseComponent } from "src/app/features/shared/base/base.component";
import { DynamicForm } from "src/app/core/models/dynamic-form.model";
import { AlertService } from "src/app/core/services/alert.service";
import { Person } from "../../../models/person";
import { PeopleService } from "../../../services/people.service";

@Component({
    selector: 'app-people-form',
    templateUrl: './people.form.component.html'
})
export class PeopleFormComponent extends BaseComponent implements OnInit {    
    form: DynamicForm[];
    formGroup: FormGroup;
    personId: string;
    loadForm: boolean = false;
    selectedPerson: Person;

    constructor(private _alertService: AlertService,
                private _peopleService: PeopleService,
                private _currentRoute: ActivatedRoute,
                private _router: Router) {
        super(_alertService)
    }

    ngOnInit(): void {
        this._currentRoute.params.subscribe(async param => {
            this.personId = param.id;

            if(this.personId){
                await this.getPerson();
            }            

            this.form = [...FORM];
        
            this.formGroup = this.getFormGroup(this.form);            
        });
    }

    async getPerson(){
        await this._peopleService.getById(this.personId).toPromise().then(
            res => {
                this.selectedPerson = res;
                setFormValue(res);
            }
        )
    }

    createUpdatePerson(data: any){
        if(this.personId){
            const person: Person = {
                ...this.selectedPerson,
                ...data,                
            }
            this._peopleService.update(person).subscribe(
                res => {
                    this._alertService.ToasterNotification('Operación exitosa', 'Persona actalizada correctamente', 'success');
                    this._router.navigate(['people']);
                }
            );
        }else{
            this._peopleService.create(data).subscribe(
                res => {
                    this._alertService.ToasterNotification('Operación exitosa', 'Persona creada correctamente', 'success');
                    this._router.navigate(['people']);
                },
                err => this.getHttpErrorResponse(err)
            );
        }
    }

    get endPath() { return this.personId ? this.personId : 'Nueva'; }
    get subtitle() { return'Inicio / Personas / '+ this.endPath };
    get title() { return this.personId ? 'Editar persona #'+this.personId : 'Nueva persona'}

}

const FORM: DynamicForm[] = [
    {
        name: 'identification',
        value: '',
        label: 'Cédula',
        type: 'text',
        placeholder: 'Digete la cedula de la persona',
        isRequired: true,
        mask: '000-0000000-0'
    },
    {
        name: 'name',
        value: '',
        label: 'Nombre',
        type: 'text',
        placeholder: 'Digete el nombre de la persona',
        isRequired: true
    },
    {
        name: 'lastName',
        value: '',
        label: 'Apellido',
        type: 'text',
        placeholder: 'Digete el apellido de la persona',
        isRequired: true
    },
    {
        name: 'datebirth',
        value: '',
        label: 'Fecha de nacimiento',
        type: 'date',
        placeholder: 'Digete la fecha de nacimiento de la persona',
        isRequired: true
    },    
    {
        name: 'address',
        value: '',
        label: 'Dirección',
        type: 'text',
        placeholder: 'Digete la drección de la persona',
    },
    {
        name: 'district',
        value: '',
        label: 'Distrito o ciudad',
        type: 'text',
        placeholder: 'Digete el distrito o ciudad de la persona',
    },
    {
        name: 'province',
        value: '',
        label: 'Provincia o Estado',
        type: 'text',
        placeholder: 'Digete la provincia o estado de la persona',
    },
    {
        name: 'nationality',
        value: '',
        label: 'Nacionalidad',
        type: 'text',
        placeholder: 'Digete la nacionalidad de la persona',
        isRequired: true
    },
    {
        name: 'phone',
        value: '',
        label: 'Telefono/Celular',
        type: 'text',
        placeholder: 'Digete el telefono o celular de la persona',
        mask: '(000) 000-0000'
    }
]

function setFormValue(res: Person) {
    FORM.forEach(item => {
        if(item.name === 'name') item.value = res.name;
        if(item.name === 'lastName') item.value = res.lastName;
        if(item.name === 'datebirth') item.value = res.datebirth;
        if(item.name === 'identification') item.value = res.identification;
        if(item.name === 'address') item.value = res.address;
        if(item.name === 'district') item.value = res.district;
        if(item.name === 'province') item.value = res.province;
        if(item.name === 'nationality') item.value = res.nationality;
        if(item.name === 'phone') item.value = res.phone;
    })
}
