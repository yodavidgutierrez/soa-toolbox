import {Injectable} from "@angular/core";
import {RolesService} from "../../../services/funcionarios/roles.service";
import {Actions, Effect, ofType} from "@ngrx/effects";
import *  as actions from './roles-actions';
import {catchError, map, switchMap} from "rxjs/internal/operators";
import {of} from "rxjs/index";

@Injectable()
export class RolesEffects{

  constructor(private _rolService:RolesService,private actions$:Actions){}

  @Effect()
  load = this.actions$.pipe(
    ofType(actions.RolesActionTypes.LOAD),
    switchMap( action => this._rolService.list((<actions.Actions> action).payload)),
    map(response => new actions.LoadSuccessAction(response)),
    catchError( () => of(new actions.LoadFailAction()))
  )

}
