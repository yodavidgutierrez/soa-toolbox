import {Injectable} from "@angular/core";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs/Rx";
import {State} from "../../redux-reducers";
import {LoadAction} from "./constantes-actions";
import {ConstanteDTO} from "../../../../shared/domain/constanteDTO";
import {getCodDocTipoIdent} from "./constantes-selectors";

@Injectable()
export class ConstantesSandbox {

  constructor(private _store:Store<State>){

  }

  load(){
    this._store.dispatch(new LoadAction());
  }

  getTiposDocIdent(): Observable<ConstanteDTO[]>{

    return this._store.select(getCodDocTipoIdent);

  }
}
