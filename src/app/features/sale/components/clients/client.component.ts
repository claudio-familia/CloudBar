import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AlertService } from "src/app/core/services/alert.service";
import { BaseComponent } from "src/app/features/shared/base/base.component";
import { Client } from "../../models/client";
import { ClientService } from "../../services/client.service";

@Component({
    selector: 'app-client',
    templateUrl: './client.component.html'
})
export class ClientComponent extends BaseComponent implements OnInit {

    clients: Client[] = [];
    tableSettings: any;

    constructor(private _alertService: AlertService,
        private _clientService: ClientService,
        private _router: Router) {
        super(_alertService)
    }

    ngOnInit(): void {
        this.tableSettings = this.setTable(
            ['id', 'person',],
            ['#', 'Nombre']);
        this.getData();
    }

    getData() {
        this._clientService.get().subscribe(res => this.clients = res, err => this.getHttpErrorResponse(err));
    }

    editDelete(data: any) {
        if (data.typeAction == 'edit')
            this._router.navigate(['clients', 'edit', data.id]);
        else
            this.deleteRow(data.id);
    }

    deleteRow(id: any) {
        this._alertService.ModalNotification('¿Está seguro?', 'Esta a punto de borrar el siguiente registro...', 'question')
            .then(res => {
                if (res.isConfirmed) {
                    this._clientService.delete(id).subscribe(
                        res => this._alertService.ToasterNotification('Operación exitosa', 'Cliente borrado correctamente', 'success'),
                        err => this.getHttpErrorResponse(err)
                    )
                }
            })
    }
}