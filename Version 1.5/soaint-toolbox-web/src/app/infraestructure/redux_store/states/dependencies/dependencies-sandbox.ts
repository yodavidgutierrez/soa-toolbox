import {Injectable} from "@angular/core";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs/Rx";
import {RolDTO} from "../../../../shared/domain/rolesDTO";
import {State} from "../../redux-reducers";
import {LoadAction} from "./dependencies-actions";
import {getDependencies} from "./dependencies-selectors";
import {DependenciaDTO} from "../../../../shared/domain/dependenciaDTO";

@Injectable()
export class DependenciesSandbox {

  constructor(private _store:Store<State>){

  }

  load(){
    this._store.dispatch(new LoadAction());
  }

  list(): Observable<DependenciaDTO[]>{

    return this._store.select(getDependencies);

  }
}
