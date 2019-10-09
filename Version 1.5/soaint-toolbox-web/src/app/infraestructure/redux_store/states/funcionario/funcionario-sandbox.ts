import {Injectable} from "@angular/core";
import {Store} from "@ngrx/store";
import {State} from "../../redux-reducers";
import {
  LoadAction,
  ResetAction,
  SelectFuncionarioByEditAction

} from "./funcionario-actions";
import {Observable} from "rxjs/Rx";
import {FuncionarioDTO} from "../../../../shared/domain/funcionarioDTO";
import {
  getDependenciesForFuncionarioEdit,
  getFuncionarioForEdit,
  getFuncionarios,
  getRolesForFuncionarioForEdit
} from "./funcionario-selectors";
import {RolDTO} from "../../../../shared/domain/rolesDTO";
import {DependenciaDTO} from "../../../../shared/domain/dependenciaDTO";

@Injectable()
export class FuncionarioSandbox {

    constructor(private _store:Store<State>){

    }

    loadFuncionarios(payload?){

      this._store.dispatch(new LoadAction(payload));
    }

    setFuncionarioForEdit(func:FuncionarioDTO){

      this._store.dispatch(new SelectFuncionarioByEditAction(func))
    }

    reset(){
      this._store.dispatch(new ResetAction());
    }


    getFuncionarios(): Observable<FuncionarioDTO[]>{

      return this._store.select(getFuncionarios);
    }

    getFuncionarioForEdit(): Observable<FuncionarioDTO>{

      return this._store.select(getFuncionarioForEdit);
    }

     getRolesForFuncionarioForEdit():Observable<RolDTO[]>{

      return this._store.select(getRolesForFuncionarioForEdit);
    }

    getDepedenciesForFuncionarioForEdit():Observable<DependenciaDTO[]>{

      return this._store.select(getDependenciesForFuncionarioEdit);

    }


}
