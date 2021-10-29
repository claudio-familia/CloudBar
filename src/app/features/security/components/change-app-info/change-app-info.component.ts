import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/core/store/app.state";
import settings from "src/appsettings.json";


@Component({
    selector: 'app-change-app-info',
    templateUrl: `change-app-info.component.html`,
    styleUrls: ['../../../shared/dynamicform/dynamicform.component.scss']
})
export class ChangeAppInfoComponent implements OnInit {

    constructor(private _store: Store<AppState>) { }

    app: any = {
        appName: settings.appName,
        loginLogo: settings.loginLogo,
        navbarLogo: settings.navbarLogo
    }

    ngOnInit(): void {
    }

    onFileChange(event: any) {
        console.log(event);
    }

    saveFile(){
        //TODO METHOD TO SAVE JSON FILE
    }
}