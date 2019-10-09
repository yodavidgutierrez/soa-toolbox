import {Injectable} from "@angular/core";
import {Store} from "@ngrx/store";
import {State} from "../../redux-reducers";
import {LoadAction, SelectMenuByEditAction, MenuActions} from './menu.actions';
import {MenuDTO} from "../../../../shared/domain/MenuDTO";
import {Observable} from "rxjs/Rx";
import {getMenuForAuthenticatedUser, getMenuOptions, getMenuForEdit} from "./menu.selectors";

@Injectable()
export class MenuSandbox {

  constructor(private _store:Store<State>){}

  load(payload  = false){
    this._store.dispatch(new LoadAction(payload));
  }

  menuOptions():Observable<MenuDTO[]>{

    return this._store.select(getMenuOptions);
  }

  menuForAuthenticatedUser(){

    return this._store.select(getMenuForAuthenticatedUser);
  }

  setMenuForEdit(menu: MenuDTO){

    this._store.dispatch(new SelectMenuByEditAction(menu))
  }

  getMenuForEdit(): Observable<any>{

    return this._store.select(getMenuForEdit);
  }


}
