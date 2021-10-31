
import { createReducer, createSelector, on } from '@ngrx/store';
import * as appState from '../../../core/store/app.state';
import * as userActions from './actions/user.actions';
import * as authActions from './actions/auth0.actions';
import { SecurityState } from './security.state';

export interface State extends appState.AppState {
    security: SecurityState;
}

const initState: SecurityState  = {
    currentUser: null,
    isLoggedIn: false,
    currentPlace: null
}

export const securityReducer = createReducer<SecurityState>(
    initState,
    on(userActions.setCurrentPlace, (state, action): SecurityState => {
      return {
        ...state,
        currentPlace: action.currentPlace
      };
    }),
    on(authActions.loginComplete, (state, { profile, isLoggedIn }) => {
      return {
        ...state,
        currentUser: profile,
        isLoggedIn,
      };
    }),  
    on(authActions.logoutComplete, (state, {}) => {
      return {
        ...state,
        currentUser: null,
        isLoggedIn: false,
      };
    })
);