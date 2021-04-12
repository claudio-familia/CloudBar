import { createAction, props } from '@ngrx/store';
import { Place } from 'src/app/features/general/models/place';
import { LoginModel } from '../../models/login';

export const setCurrentUser = createAction(
    '[Security Module] Set currentUser',
    props<{ currentUser: LoginModel }>()
);

export const setCurrentPlace = createAction(
    '[Security Module] Set currenPlace',
    props<{ currentPlace: Place }>()
);

export const setWheterHasLoggedIn = createAction(
    '[Security Module] Set Wheter User Has Logged In',
    props<{ isLoggedIn: boolean }>()
);