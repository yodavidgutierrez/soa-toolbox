import {Action} from "@ngrx/store";
import {tassign} from "tassign";
import {DependenciaDTO} from "../../../../shared/domain/dependenciaDTO";
import {Actions, DependenciesActionTypes} from "./dependencies-actions";

export interface State {
  dependencies: DependenciaDTO[];

}

 const initialState: State = {
  dependencies:[]
};

export function reducers(state = initialState,action:Action) {

  if(action.type === DependenciesActionTypes.LOAD_SUCCESS)
    return tassign(state,{dependencies: (<Actions> action).payload});

  return state;

}
