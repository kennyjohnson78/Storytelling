import { createSelector, createFeatureSelector } from '@ngrx/store';
import { StatusState } from '../states/status.state';
import { LoginPageState } from '../states/login-page.state';
import { AuthenticationState } from '../states/authentication-state.state';

const selectAuthenticationState = createFeatureSelector<AuthenticationState>('authentication');
const selectAuthenticationStatusState = createSelector(
  selectAuthenticationState,
  (state: AuthenticationState) => state.status
);
const selectLoginPageState = createSelector(selectAuthenticationState, (state: AuthenticationState) => state.loginPage);

export const selectIsLoggedIn = createSelector(selectAuthenticationStatusState, (state: StatusState) => state.loggedIn);
export const selectUser = createSelector(selectAuthenticationStatusState, (state: StatusState) => state.user);
export const selectTokenExpiresIn = createSelector(
  selectAuthenticationStatusState,
  (state: StatusState) => state.tokenExpiresIn
);
export const selectLoginPageError = createSelector(selectLoginPageState, (state: LoginPageState) => state.error);
export const selectLoginPagePending = createSelector(selectLoginPageState, (state: LoginPageState) => state.pending);
