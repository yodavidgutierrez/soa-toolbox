import {Injectable} from "@angular/core";
import {Store} from "@ngrx/store";
import {State} from "../../redux-reducers";
import {LoadAction} from "./roles-actions";
import {Observable} from "rxjs/Rx";
import {RolDTO} from "../../../../shared/domain/rolesDTO";
import {getRoles} from "./roles-selectors";

@Injectable()
export class RolesSandbox {

  constructor(private _store:Store<State>){

  }

  load(idApplication){
    this._store.dispatch(new LoadAction(idApplication));
  }

  list(): Observable<RolDTO[]>{

    return this._store.select(getRoles);

  }

}
