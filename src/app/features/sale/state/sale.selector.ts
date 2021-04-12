import { createFeatureSelector, createSelector } from "@ngrx/store";
import { FeatureStates } from "src/app/core/store/app.constant";
import { SaleState } from "./sale.state";


const getSaleFeatureSelector = createFeatureSelector<SaleState>(FeatureStates.sale);

export const getCurrenSaleOrder = createSelector(
    getSaleFeatureSelector,
    state => state.currentSaleOrder
);
