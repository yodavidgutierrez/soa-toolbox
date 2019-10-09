import {MenuDTO} from "../../../../shared/domain/MenuDTO";
import {tassign} from "tassign";
import {Action} from "@ngrx/store";
import {Actions, MenuActions} from "./menu.actions";
import { isNullOrUndefined } from 'util';

export interface State {
  menuOptions:MenuDTO[];
  MenuForEdit: MenuDTO;

}

const initialState:State = {
  menuOptions:[],
  MenuForEdit: null

};


export function reducers(state = initialState,action:Action) {

  switch (action.type){
    case MenuActions.LOAD_SUCCESS:  return tassign(state,{menuOptions: (<Actions> action).payload.applications});

    case MenuActions.CLEAR: return initialState;

    case MenuActions.SELECT_MENU_BY_EDIT :
      return tassign(state, {MenuForEdit: (<Actions>action).payload});
  }

  return state;

}
