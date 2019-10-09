import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot } from '@angular/router';
import 'rxjs/add/operator/take';
import { Observable } from 'rxjs';
import { LoginSandbox } from 'src/app/infraestructure/redux_store/states/authentication/login-sandbox';



/**
 * Prevent unauthorized activating and loading of routes
 * @class AuthenticatedGuard
 */
@Injectable()
export class AuthenticatedGuard implements CanActivate, CanLoad {

  /**
   * @constructor
   */
  constructor(private _sandbox: LoginSandbox) {}

  /**
   * True when user is authenticated
   * @method canActivate
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    // get observable
    const observable = this._sandbox.selectorAuthenticated();
    // redirect to sign in page if user is not authenticated
    observable.subscribe( authenticated => {
      if (!authenticated) {
        this._sandbox.routeToLogin();
      }

    });

    return observable;
  }

  /**
   * True when user is authenticated
   * @method canLoad
   */
  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
    // get observable
    const observable = this._sandbox.selectorAuthenticated();
    // redirect to sign in page if user is not authenticated
    observable.subscribe(authenticated => {
      if (!authenticated) {
        this._sandbox.routeToLogin();
      }
    });

    return observable;
  }
}
