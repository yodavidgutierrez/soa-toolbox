import {Injectable} from "@angular/core";
import {Actions, Effect, ofType} from "@ngrx/effects";
import {MenuServices} from "../../../services/menu/menu.services";
import {Observable} from "rxjs/Rx";
import {Action, Store} from "@ngrx/store";
import * as actions from './menu.actions';
import {catchError, map, switchMap, tap} from "rxjs/internal/operators";
import {combineLatest, of} from "rxjs/index";
import {State} from "../../redux-reducers";
import {getMenuForAuthenticatedUser} from "./menu.selectors";
import {Router} from "@angular/router";
import {isNullOrUndefined} from "util";



@Injectable()
export class MenuEffects {



  constructor(
    private actions$:Actions,
    private _menuService:MenuServices,
    private _store:Store<State>,
    private router: Router
    ){

  }

  @Effect()
  load:Observable<Action> = this.actions$.pipe(
    ofType(actions.MenuActions.LOAD),
    switchMap((action) => combineLatest(this._menuService.list(),of((<actions.Actions>action).payload))),
    map(([apps,leavePage]) => new actions.LoadSuccessAction({applications:apps,leavePage: leavePage})),
    catchError(() => of(new actions.LoadFailAction()))
    )

  @Effect({dispatch:false})
  loadSucess:Observable<Action> = this.actions$.pipe(
    ofType(actions.MenuActions.LOAD_SUCCESS),
    tap(action => {

      if((<actions.Actions>action).payload.leavePage){

        this._store.select(getMenuForAuthenticatedUser).subscribe( apps =>{

          const ap = apps.filter(app => app.defaultApplication);

          if(isNullOrUndefined(apps) || apps.length === 0){
            this.router.navigate(['/pages/application','notfound']);

            return;
          }

          let application = apps.find(app => app.defaultApplication);

          if(isNullOrUndefined(application))
             application = apps[0];

          this.router.navigate(['/pages/application',application.idApplication]);

        }).unsubscribe()
      }
    })
  )

}
