import { createFeatureSelector, createSelector } from "@ngrx/store";
import { FeatureStates } from "src/app/core/store/app.constant";
import { CoreState } from "./state";


const getAppFeatureSelector = createFeatureSelector<CoreState>(FeatureStates.app);

export const getIsLoading = createSelector(
    getAppFeatureSelector,
    state => state.isLoading
);
