import {Action} from '@ngrx/store';
import { type } from '../../redux-util';

export const ActionTypes = {
  LOGIN: type('[Login] Login Dispatch'),
  LOGIN_SUCCESS: type('[Login] Login SUCCESS'),
  LOGIN_FAIL: type('[Login] Login FAIL'),
  LOGOUT: type('[Login] Logout Dispatch'),
  LOGOUT_SUCCESS: type('[Login] Logout SUCCESS'),
  LOGOUT_FAIL: type('[Login] Logout FAIL'),
  SESSION_RESTORED: type('[Login] Session Restored'),
  UPDATE_PROFILE: type('[Login] Update Profile'),
};

export class LoginAction implements Action {

  type = ActionTypes.LOGIN;

  constructor(public payload?: any) { }
}

export class LoginSuccessAction implements Action {
  type = ActionTypes.LOGIN_SUCCESS;

  constructor(public payload?: any) { }
}

export class LoginFailAction implements Action {
  type = ActionTypes.LOGIN_FAIL;

  constructor(public payload?: any) { }
}

export class LogoutAction implements Action {
  type = ActionTypes.LOGOUT;

  constructor(public payload?: any) { }
}

export class UpdateProfileAction implements Action {
  type = ActionTypes.UPDATE_PROFILE;

  constructor(public payload?: any) { }
}

export type Actions =
  LoginAction |
  LoginSuccessAction |
  LoginFailAction |
  LogoutAction|
  UpdateProfileAction;


