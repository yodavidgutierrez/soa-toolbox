import {RolDTO} from "../../../../shared/domain/rolesDTO";
import {Action} from "@ngrx/store";
import {Actions, RolesActionTypes} from "./roles-actions";
import {tassign} from "tassign";

export interface State {
  roles: RolDTO[];

}

const initialState: State = {
  roles:[]

};

export function reducers(state = initialState,action:Action) {

  if(action.type === RolesActionTypes.LOAD_SUCCESS)
    return tassign(state,{roles: (<Actions> action).payload});

  return state;

}
