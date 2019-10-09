import {Injectable} from "@angular/core";
import {Actions, Effect, ofType} from "@ngrx/effects";
import {Sandbox} from "./sandbox";
import {ActionTypes} from "./actions";
import {Observable} from "rxjs/Rx";
import  *  as actions from './actions';
import {map, tap} from "rxjs/internal/operators";
import {Action} from "@ngrx/store";

@Injectable()
export class Effects {

  constructor(private actions$:Actions, private _sandbox: Sandbox){

  }

  @Effect({
    dispatch: false
  })
   notify: Observable<Action>  = this.actions$.pipe(
     ofType(ActionTypes.PUSH_NOTIFICATION),
     map(action => (<actions.Actions>action).payload),
     tap( (payload => this._sandbox.showNotification(payload)))
     )

}
