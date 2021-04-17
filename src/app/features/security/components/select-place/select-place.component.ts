import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/core/store/app.state";
import { Place } from "src/app/features/general/models/place";
import { PlaceService } from "src/app/features/general/services/place.service";
import * as UserActions from '../../state/actions/user.actions';

@Component({
    selector: 'app-select-place',	
    templateUrl: `select-place.component.html`    
})
export class SelectPlaceComponent implements OnInit {
    
    places: Place[];
    placesFiltered: Place[];
    selectedPlace: Place;

    constructor(private _store: Store<AppState>, private _placeService: PlaceService)
    { }

    ngOnInit(): void {
        this.getPlaces();
    }

    getPlaces() {
        this._placeService.get().subscribe(
            res => {
                this.places = res;
                this.placesFiltered = [...res];
            }
        )
    }

    selectPlace(){   
        localStorage.setItem('app-current-place', JSON.stringify(this.selectedPlace))
        this._store.dispatch(UserActions.setCurrentPlace({currentPlace: this.selectedPlace}));
    }

}