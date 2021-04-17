
import { createReducer, createSelector, on } from '@ngrx/store';
import * as appState from '../../../core/store/app.state';
import { SaleState } from './sale.state';
import * as saleOrderActions from './actions/sale.actions';

export interface State extends appState.AppState {
    sale: SaleState;
}

const initState: SaleState  = {
    currentSaleOrder: null
}

export const saleReducer = createReducer<SaleState>(
    initState,
    on(saleOrderActions.setCurrentSaleOrder, (state, action): SaleState => {
      return {
        ...state,
        currentSaleOrder: action.currentSaleOrder
      };
    }),
);