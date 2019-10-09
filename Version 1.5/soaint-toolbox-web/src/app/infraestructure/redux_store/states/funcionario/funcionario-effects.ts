import {Injectable} from "@angular/core";
import {FuncionarioService} from "../../../services/funcionarios/funcionario.service";
import {Actions, Effect, ofType} from "@ngrx/effects";
import {Observable} from "rxjs/Rx";
import {Action} from "@ngrx/store";
import * as actions from "./funcionario-actions";
import {catchError, switchMap,map} from "rxjs/internal/operators";
import {of} from "rxjs/index";


@Injectable()
export class FuncionarioEffects {

  constructor(private _funcionarioService: FuncionarioService,private actions$: Actions){

  }

  @Effect()
  load:Observable<Action> = this.actions$.pipe(
    ofType(actions.FuncionarioActionTypes.LOAD),
    switchMap( action => this._funcionarioService.list((<actions.Actions>action).payload)),
    map(response => new actions.LoadSuccessAction(response)),
    catchError( () => of(new actions.LoadFailAction()))
    )

}
