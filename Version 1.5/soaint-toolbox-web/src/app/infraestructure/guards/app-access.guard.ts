import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs/Rx";
import {MenuSandbox} from "../redux_store/states/menu/menu.sandbox";
import {isNullOrUndefined} from "util";

@Injectable()
export  class AppAccessGuard implements CanActivate{

  constructor(private _menuSandbox:MenuSandbox){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      return this._menuSandbox.menuOptions().map( opts => {

        if(opts.length === 0){

          history.back();

           return false;
        }

        const id = route.params.id || route.data.id;

        if(isNullOrUndefined(id)){

          history.back();
          return false;
        }


        const r =  opts.some(opt => opt.idApplication == id);

        if(!r)
           history.back();

        return r;
      })
  }

}
