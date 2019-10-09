import {Injectable} from "@angular/core";
import { map, switchMap} from "rxjs/internal/operators";
import {Actions, Effect, ofType} from "@ngrx/effects";
import * as actions from "./constantes-actions";
import {ConstantesServices} from "../../../services/funcionarios/constantes.services";

@Injectable()
export  class ConstantesEffects {

  constructor(private _constanteService:ConstantesServices,private actions$:Actions){}

  @Effect()
  load = this.actions$.pipe(
    ofType(actions.ConstanteActionTypes.LOAD),
    switchMap( () => this._constanteService.getTiposDocIdent()),
    map(response => {
      return  new actions.LoadTipoDocIdentidadAction(response.constantes || []);
    })

  )

}
