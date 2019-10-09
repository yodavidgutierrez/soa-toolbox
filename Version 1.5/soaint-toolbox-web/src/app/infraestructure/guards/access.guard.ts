import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Route,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import {State as RootState} from "../redux_store/redux-reducers";
import {Store} from "@ngrx/store";
import {loginStore} from "../redux_store/states/authentication/login-selectors";
import {map} from "rxjs/internal/operators";
import {isArray, isNullOrUndefined} from "util";
import {Go} from "../redux_store/states/navigation/actions";

@Injectable()
export class AccessGuard implements CanActivate  {

  constructor( private _store: Store<RootState>){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

  return   this._store.select(loginStore)
    .pipe(map( sessionData => {

      if(!sessionData.isAuthenticated){

        this._store.dispatch(new Go({path:['/login']}));

           return false;
      }

      if(isNullOrUndefined(route.data.rolesAllowed))
         return true;

      const rolesAllowed =(isArray(route.data.rolesAllowed))?  route.data.rolesAllowed : [route.data.rolesAllowed];

      return sessionData.profile.roles.some(r => (isArray(rolesAllowed)) ? rolesAllowed.includes(r.name) : r.name === rolesAllowed);

    } ));
  }



}
