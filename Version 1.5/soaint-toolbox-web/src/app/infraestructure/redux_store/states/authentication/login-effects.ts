import {Injectable} from '@angular/core';
import { Effect, Actions, ofType} from '@ngrx/effects';
import {Action, Store} from '@ngrx/store';
import 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import * as login from './login-actions';
import * as funcionario from '../funcionario/funcionario-actions';
import {LoginSandbox} from './login-sandbox';
import {tassign} from 'tassign';
import { map, switchMap, exhaustMap, mergeMap, catchError, tap, mapTo } from 'rxjs/operators';
import { UsuarioDto } from 'src/app/shared/domain/usuarioDto';
import { AuthService } from 'src/app/infraestructure/services/auth/auth.service';
import { Router } from '@angular/router';
import {State as RootState} from "../../redux-reducers";
import { Observable } from 'rxjs/Observable';
import {combineLatest, from, of} from 'rxjs';
import {LoginAction} from "./login-actions";
import {ClearAction, LoadAction} from "../menu/menu.actions";
import {getMenuForAuthenticatedUser} from "../menu/menu.selectors";
import {isNullOrUndefined} from "util";




@Injectable()
export class LoginEffects {

  constructor(private actions$: Actions,
              private loginSandbox: LoginSandbox,
              private store:Store<RootState>,
              private loginService: AuthService,
              private router: Router
              ) {
  }

  @Effect()
  login: Observable<Action> = <Observable<Action>>this.actions$.pipe(
    ofType(login.ActionTypes.LOGIN),
    map(action => (<LoginAction>action).payload),
    switchMap(payload => {
        return this.loginService.login({login: payload['username'], password: payload['password']})
          .pipe(
            catchError(error => of( new login.LoginFailAction({error: error}) )),
            switchMap((response) => {
                return response instanceof login.LoginFailAction ? of(response) : from([
                  new login.LoginSuccessAction(tassign(response, {credentials: payload})),
                  new LoadAction(true)
                ]);
              }
            ));
      }));

  @Effect({dispatch: false})
  loginSuccess: Observable<Action> = this.actions$.pipe(
    ofType(login.ActionTypes.LOGIN_SUCCESS),
    tap( (r:any) => {


       const sessionData = Object.assign({},r.payload);

       const password = sessionData.credentials.password;

       sessionData.credentials = Object.assign({},sessionData.credentials,{password: btoa( sessionData.credentials.password)});
       localStorage.setItem("toolboxSession",JSON.stringify(sessionData));

      sessionData['credentials'].password = password;

    })
  );

  @Effect()
  logout: Observable<Action> = this.actions$.pipe(
    ofType(login.ActionTypes.LOGOUT),
    tap( _ => {
      localStorage.removeItem("toolboxSession");
      localStorage.removeItem("toolboxLastActivity");
      this.router.navigate(['/login']);
    }),
    map(() =>  new ClearAction())
  );

}
