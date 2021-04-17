
import { createReducer, createSelector, on } from '@ngrx/store';
import * as AppActions from './app.action';
import { CoreState } from './state';
import * as appState from '../app.state';

export interface State extends appState.AppState {
    isLoading: Boolean;
}

const initState: CoreState  = {
    isLoading: false
}

export const appReducer = createReducer<CoreState>(
    initState,
    on(AppActions.setLoadingState, (state, action): CoreState => {
      return {
        ...state,
        isLoading: action.isLoading
      };
    }),
);