import { createAction, props } from '@ngrx/store';
import { SaleOrder } from '../../models/sale';

export const setCurrentSaleOrder = createAction(
    '[Sale Module] Set currentSaleOrder',
    props<{ currentSaleOrder: SaleOrder }>()
);