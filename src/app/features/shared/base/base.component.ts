import { FormControl, FormGroup, Validators } from '@angular/forms'
import { DynamicForm } from 'src/app/core/models/dynamic-form.model'
import { AlertService } from '../../../core/services/alert.service'

export class BaseComponent {    
    constructor(private alertService: AlertService) {
    }
    getHttpErrorResponse(error: any){
        console.log(error)
        switch (error.status) {
            case 401:                                
              return this.alertService.ModalNotification(
                'Aviso','No se encontraron los accesos para realizar esta acción.','error')
                    .then((result) => { 
                        if (result.value) { 
                            localStorage.removeItem('api-token')
                            localStorage.removeItem('app-user')
                            window.location.replace('/login') 
                        }
                    })
            case 404:
              return this.alertService.ToasterNotification('Aviso','No fueron encontrados datos en esta operación.','info')
            case 500:
              return this.alertService.ToasterNotification('Error','Oops! Ha ocurrido un error.','error')
            case 403:
                return this.alertService.ModalNotification(
                    'Aviso','No se encontraron los accesos para realizar esta acción.','error')
                    .then((result) => { 
                        if (result.value) { 
                            localStorage.removeItem('api-token')
                            localStorage.removeItem('app-user')
                            window.location.replace('/login') 
                        }
                    })
            case 0:
                return this.alertService.ToasterNotification('Error','Oops! Ha ocurrido un error.','error')
            case undefined:
                return this.alertService.ToasterNotification('Error','Oops! Ha ocurrido un error.','error')
          }
    }   
    
    getFormGroup(form: DynamicForm[]): FormGroup {
        const group = {};

        form.forEach(item => {
          const valueObj = {value: item.value, disabled: item.isDisabled };

          const validatorObj = [];
          if(item.isRequired) validatorObj.push(Validators.required)

          group[item.name] = new FormControl(valueObj, validatorObj);
        });    
    
        return new FormGroup(group);
    }

    setTable(columns: string[], headers: string[]) {
        const tableColumn = [...columns];
        const tableHeader = [...headers];

        return {
            headers: tableHeader,
            columns: tableColumn
        }
    }         
}