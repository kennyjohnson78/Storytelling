import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { MatSnackBar } from '@angular/material';
import { LoginSnackComponent } from '../../components/login-snack/login-snack.component';
import { AuthenticationApiService } from '../../services/authentication.api.service';
import * as fromAuthentication from '../actions/authentication-state.actions';
import { fromRouter } from '@labdat/router-state';

import { Observable } from 'rxjs/Observable';
import { defer } from 'rxjs/observable/defer';
import { map } from 'rxjs/operators/map';
import { mapTo } from 'rxjs/operators/mapTo';
import { tap } from 'rxjs/operators/tap';
import { exhaustMap } from 'rxjs/operators/exhaustMap';
import { catchError } from 'rxjs/operators/catchError';
import { of } from 'rxjs/observable/of';
import { empty } from 'rxjs/observable/empty';

@Injectable()
export class AuthenticationEffectsService {
  @Effect()
  login$ = this.actions$.ofType(fromAuthentication.LOGIN).pipe(
    map(toPayload),
    exhaustMap(auth =>
      this.authenticationApiService.login(auth).pipe(
        catchError(error => {
          this.store.dispatch(new fromAuthentication.LoginFailure('Email or Password Invalid'));
          return empty();
        })
      )
    ),
    tap((payload: any) => {
      sessionStorage.setItem('user', JSON.stringify(payload.user));
      sessionStorage.setItem('tokenExpiresIn', payload.tokenExpiresIn);
    }),
    map(payload => new fromAuthentication.LoginSuccess({ user: payload.user, tokenExpiresIn: payload.tokenExpiresIn }))
  );

  @Effect()
  logout$ = this.actions$.ofType(fromAuthentication.LOGOUT).pipe(
    map(toPayload),
    tap(message => {
      sessionStorage.removeItem('tokenExpiresIn');
      sessionStorage.removeItem('user');
      this.snackBar.openFromComponent(LoginSnackComponent, {
        duration: 1000,
        data: message || 'Logout',
        horizontalPosition: 'right',
        verticalPosition: 'top'
      });
    }),
    mapTo(new fromRouter.Go({ path: ['/', 'auth'] }))
  );

  @Effect()
  loginSuccess$ = this.actions$.ofType(fromAuthentication.LOGIN_SUCCESS).pipe(
    map(() => {
      this.snackBar.openFromComponent(LoginSnackComponent, {
        duration: 1000,
        data: 'Login Success',
        horizontalPosition: 'right',
        verticalPosition: 'top'
      });
    }),
    mapTo(new fromRouter.Go({ path: ['/', 'test'] }))
  );

  @Effect({ dispatch: false })
  loginFailure$ = this.actions$.ofType(fromAuthentication.LOGIN_FAILURE).pipe(
    map(toPayload),
    tap(message =>
      this.snackBar.openFromComponent(LoginSnackComponent, {
        duration: 1000,
        data: message,
        horizontalPosition: 'right',
        verticalPosition: 'top'
      })
    )
  );

  @Effect()
  register$ = this.actions$.ofType(fromAuthentication.REGISTER).pipe(
    map(toPayload),
    exhaustMap(auth =>
      this.authenticationApiService.register({ ...auth, username: auth.firstName + auth.lastName, roles: ['user', 'admin'] }).pipe(
        catchError(error => {
          this.store.dispatch(new fromAuthentication.RegisterFailure('Register Error'));
          return empty();
        })
      )
    ),
    tap((payload: any) => {
      sessionStorage.setItem('user', JSON.stringify(payload.user));
      sessionStorage.setItem('tokenExpiresIn', payload.tokenExpiresIn);
    }),
    map(payload => new fromAuthentication.RegisterSuccess({ ...payload }))
  );

  @Effect()
  registerSuccess$ = this.actions$.ofType(fromAuthentication.REGISTER_SUCCESS).pipe(
    map(() => {
      this.snackBar.openFromComponent(LoginSnackComponent, {
        duration: 1000,
        data: 'Register Success',
        horizontalPosition: 'right',
        verticalPosition: 'top'
      });
    }),
    mapTo(new fromRouter.Go({ path: ['/', 'test'] }))
  );

  @Effect({ dispatch: false })
  registerFailure$ = this.actions$.ofType(fromAuthentication.REGISTER_FAILURE).pipe(
    map(toPayload),
    tap(message =>
      this.snackBar.openFromComponent(LoginSnackComponent, {
        duration: 1000,
        data: message,
        horizontalPosition: 'right',
        verticalPosition: 'top'
      })
    )
  );

  constructor(
    private actions$: Actions,
    private authenticationApiService: AuthenticationApiService,
    private router: Router,
    private snackBar: MatSnackBar,
    private store: Store<any>
  ) {}
}
