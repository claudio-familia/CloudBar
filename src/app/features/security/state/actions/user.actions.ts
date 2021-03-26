import { createAction, props } from '@ngrx/store';
import { LoginModel } from '../../models/login';

export const setCurrentUser = createAction(
    '[Security Module] Set currentUser',
    props<{ currentUser: LoginModel }>()
);

export const setWheterHasLoggedIn = createAction(
    '[Security Module] Set Wheter User Has Logged In',
    props<{ isLoggedIn: boolean }>()
);