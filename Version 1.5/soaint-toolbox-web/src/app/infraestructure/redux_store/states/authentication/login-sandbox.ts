import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import * as selectors from './login-selectors';
import * as actions from './login-actions';
import { HttpHandler } from 'src/app/infraestructure/utils/http-handler';
import {State} from "../../redux-reducers";
import { UsuarioDto } from 'src/app/shared/domain/usuarioDto';
import { Observable } from 'rxjs';
import {UserProfileDTO} from "../../../../shared/domain/userProfileDTO";
import {UserProfile} from "../../../../ui/components/pages/auth/login/models/user-profile.model";



@Injectable()
export class LoginSandbox {

  constructor(private _router: Router,
              private _http: HttpHandler,
              private _store: Store<State>) {
  }

  routeToHome(): void {
    // this._store.dispatch(go('/home'));
  }

  routeToLogin(): void {
    // this._store.dispatch(go('/login'));
  }

  selectorLoading(): Observable<boolean> {
    return this._store.select(selectors.isLoading);
  }

  selectorError(): Observable<string> {
    return this._store.select(selectors.getError)
  }

  selectProfile():Observable<UserProfile>{

    return this._store.select(selectors.profileStore);
  }

  selectorToken(): Observable<string> {
    return this._store.select(selectors.getToken);
  }

  selectorAuthenticated(): any {
    return this._store.select(selectors.isAuthenticated);
  }

  loginDispatch(payload: UsuarioDto) {
    this._store.dispatch(new actions.LoginAction(payload));
  }

  logoutDispatch() {
    this._store.dispatch(new actions.LogoutAction());
  }

  updateProfile(payload: UserProfile){
    this._store.dispatch(new actions.UpdateProfileAction(payload) );
  }


}
