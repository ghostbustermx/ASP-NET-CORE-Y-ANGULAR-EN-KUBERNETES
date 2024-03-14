import { Action } from '@ngrx/store';
import { EmailPasswordCredentials, UserCreateRequest, UserResponse } from './user.models';

export enum Types {
  INIT = '[User] Init: Start',
  INIT_AUTHORIZED = '[User] Init: Authorized',
  INIT_UNAUTHORIZED = '[User] Init: UnAuthorized',
  INIT_ERROR = '[ uSER] Init: Error',

  SIGN_IN_EMAIL = '[User] Login: Start',
  SIGN_IN_EMAIL_SUCCESS = '[User] Login: Success',
  SIGN_IN_EMAIL_ERROR = '[User] Login: Error',

  SIGN_UP_EMAIL = '[User] Registrar usuario con Email: Start',
  SIGN_UP_EMAIL_SUCCESS = '[User] Registrar usuario con Email: Success',
  SIGN_UP_EMAIL_ERROR = '[User] Registrar usuario con Email: Error',

  SIGN_OUT_EMAIL = '[User] Logout: Start',
  SIGN_OUT_EMAIL_SUCCESS = '[User] Logout: Success',
  SIGN_OUT_EMAIL_ERROR = '[User] Logout: Error',
}

//INIT -> EL SUARIO ESTA EN SESION? #esto permite crear un objeto dependiendo del tipo de estado para saber si un usuario esta en sesion
export class Init implements Action {
  readonly type = Types.INIT;
  constructor(){}
}

export class InitAuthorized implements Action{
  readonly type = Types.INIT_AUTHORIZED;
  constructor(public email: string, public user: UserResponse | null){}
}

export class InitUnAuthorized implements Action{
  readonly type = Types.INIT_UNAUTHORIZED;
  constructor(){}
}

export class InitError implements Action{
  readonly type = Types.INIT_ERROR;
  constructor(public error: string){}
}

//LOGIN
export class SignInEmail implements Action {
  readonly type = Types.SIGN_IN_EMAIL;
  constructor(public credentials: EmailPasswordCredentials){}
}

export class SignInEmailSuccess implements Action {
  readonly type = Types.SIGN_IN_EMAIL_SUCCESS;
  constructor(public email: string, public user: UserResponse){}
}

export class SignInEmailError implements Action{
  readonly type = Types.SIGN_IN_EMAIL_ERROR;
  constructor(public error: string){}
}

//SignUP o registro de usuarios

export class SignUpEmail implements Action{
  readonly type = Types.SIGN_UP_EMAIL;
  constructor(public user: UserCreateRequest){}
}

export class SignUpEmailSuccess implements Action{
  readonly type = Types.SIGN_UP_EMAIL_SUCCESS;
  constructor(public email: string, public user: UserResponse | null){}
}

export class SignUpEmailError implements Action{
  readonly type = Types.SIGN_UP_EMAIL_ERROR;
  constructor(public error: string){}
}

// Salir de sesion o LOG OUT
export class SignOut implements Action{
  readonly type = Types.SIGN_OUT_EMAIL;
  constructor(){}
}


export class SignOutSuccess implements Action{
  readonly type = Types.SIGN_OUT_EMAIL_SUCCESS;
  constructor (){}
}

export class SignOutError implements Action {
  readonly type = Types.SIGN_OUT_EMAIL_ERROR;
  constructor(public error:string){}
}

export type All =
  Init
| InitAuthorized
| InitUnAuthorized
| InitError
| SignInEmail
| SignInEmailSuccess
| SignInEmailError
| SignUpEmail
| SignUpEmailSuccess
| SignUpEmailError
| SignOut
| SignOutSuccess
| SignOutError;


