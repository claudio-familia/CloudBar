
import { createReducer, createSelector, on } from '@ngrx/store';
import * as appState from '../../../core/store/app.state';
import * as userActions from './actions/user.actions';
import { SecurityState } from './security.state';

export interface State extends appState.AppState {
    security: SecurityState;
}

const initState: SecurityState  = {
    currentUser: null,
    isLoggedIn: false
}

export const securityReducer = createReducer<SecurityState>(
    initState,
    on(userActions.setCurrentUser, (state, action): SecurityState => {
      return {
        ...state,
        currentUser: action.currentUser
      };
    }),
    on(userActions.setWheterHasLoggedIn, (state, action): SecurityState => {
      return {
        ...state,
        isLoggedIn: action.isLoggedIn
      };
    })
);