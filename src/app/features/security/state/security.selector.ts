import { createFeatureSelector, createSelector } from "@ngrx/store";
import { FeatureStates } from "src/app/core/store/app.constant";
import { SecurityState } from "./security.state";


const getSecurityFeatureSelector = createFeatureSelector<SecurityState>(FeatureStates.security);

export const getCurrentUser = createSelector(
    getSecurityFeatureSelector,
    state => state.currentUser
);

export const hasLogin = createSelector(
    getSecurityFeatureSelector,
    state => state.isLoggedIn
);

export const getCurrentPlace = createSelector(
    getSecurityFeatureSelector,
    state => state.currentPlace
);