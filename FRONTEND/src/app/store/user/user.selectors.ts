import { createSelector, createFeatureSelector } from "@ngrx/store";
import { UserState } from './user.reducer';

export const getUserSate = createFeatureSelector<UserState>('user');

export const getUser = createSelector(
  getUserSate,
  (state) => state.entity
)


export const getLoading = createSelector(
  getUserSate,
  (state) => state.loading
)

export const getIsAuthorized = createSelector(
  getUserSate,
  (state) => !!state.email
)
