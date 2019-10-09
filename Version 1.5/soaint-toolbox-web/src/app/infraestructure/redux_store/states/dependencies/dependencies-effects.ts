import {Injectable} from "@angular/core";
import {catchError, map, switchMap} from "rxjs/internal/operators";
import {Actions, Effect, ofType} from "@ngrx/effects";
import * as actions from "./dependencies-actions";
import {of} from "rxjs/index";
import {DependenciesService} from "../../../services/funcionarios/dependencies.service";

@Injectable()
export  class DependenciesEffects {

  constructor(private _depServices:DependenciesService,private actions$:Actions){}

  @Effect()
  load = this.actions$.pipe(
    ofType(actions.DependenciesActionTypes.LOAD),
    switchMap( () => this._depServices.list()),
    map(response => new actions.LoadSuccessAction(response.dependencias ||[])),
    catchError( () => of(new actions.LoadFailAction()))
  )

}
