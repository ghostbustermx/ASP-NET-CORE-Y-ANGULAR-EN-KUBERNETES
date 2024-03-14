import { Injectable } from '@angular/core';
import * as fromActions from './user.actions';
import { HttpClient } from '@angular/common/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { NotificationService } from '@app/services';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { UserResponse } from './user.models';
import { environment } from '@src/environments/environment';

type Action = fromActions.All;

@Injectable()

export class UserEffects {

  constructor(
    private httpClient: HttpClient,
    private actions: Actions,
    private notification: NotificationService,
    private router: Router
  ){}

  signUpEmail: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.Types.SIGN_UP_EMAIL),
      map((action: fromActions.SignUpEmail) => action.user),
      switchMap( userData =>
        this.httpClient.post<UserResponse>(`${environment.url}api/usuario/registrar`, userData)
         .pipe(
          tap((response: UserResponse) => {
            localStorage.setItem('token', response.token);
            this.router.navigate(['/']);
          }),
          map((response: UserResponse) => new fromActions.SignUpEmailSuccess(response.email, response || null)),
          catchError(err => {
            this.notification.error("Errores al registrar un nuevo usuario");
            return of(new fromActions.SignUpEmailError(err.message));
          })
         )
      )
    )
  );

  signInEmail: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      //1.- aqui se define la operacion que quieres trabajar
      ofType(fromActions.Types.SIGN_IN_EMAIL),
      //2.- obtener los paramatros para poder llevar a cabo esta transaccion
      map((action: fromActions.SignInEmail) => action.credentials),
      //3.- representa la comunicacion con el servidor y la evaluacion de los resultados tanto si es exitoso como si hubo errores en dicha comunicacion
      switchMap( credentials =>
        //el servidor va a devolver un UserResponse
        this.httpClient.post<UserResponse>(`${environment.url}api/usuario/login`, credentials)
         //pipe para evaluar los posibles resultados de esta operacion
         .pipe(
          //tap se utiliza cuando la operacion es exitosa
          tap((response: UserResponse) => {
            localStorage.setItem('token', response.token);
            this.router.navigate(['/']);
          }),
          //para que me devuelva un observable que diga que es un SignInEmailSuccess
          map((response: UserResponse) => new fromActions.SignInEmailSuccess(response.email, response || null)),
          //en el caso que existan errores voy a utilizar un catchError
          catchError(err => {
            this.notification.error("Las credenciales son incorrectas");
            return of(new fromActions.SignInEmailError(err.message));
          })
         )
      )
    )
  );

  init: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.Types.INIT),
      switchMap( async () => localStorage.getItem('token')),
      switchMap( token => {
        if(token){
          return this.httpClient.get<UserResponse>(`${environment.url}api/usuario`)
         .pipe(
          tap((user: UserResponse) => {
            console.log('Data del usuario en sesion que viene del servidor', user);
          }),
          map((user: UserResponse) => new fromActions.InitAuthorized(user.email, user || null)),
          catchError(err => {
            return of(new fromActions.InitError(err.message));
          })
         )
        } else{
          return of(new fromActions.InitUnAuthorized());
        }
      }
      )
    )
  );

}
