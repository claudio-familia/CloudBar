import { createAction, props } from '@ngrx/store';

export const setLoadingState = createAction(
    '[App Module] Set Loading State',
    props<{ isLoading: Boolean }>()
);