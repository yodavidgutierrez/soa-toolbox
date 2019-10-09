import {type} from "../../redux-util";
import {Action} from "@ngrx/store";

export const DependenciesActionTypes = {
  LOAD_SUCCESS: type('[DependenciaDTO] LoadSuccessAction'),
  LOAD: type('[DependenciaDTO] LoadAction'),
  LOAD_FAIL: type('[DependenciaDTO] LoadAllFailAction'),
};

export  class  LoadAction implements Action{
  type = DependenciesActionTypes.LOAD;

  constructor(public payload?:any){}

}

export  class  LoadSuccessAction implements Action{
  type = DependenciesActionTypes.LOAD_SUCCESS;

  constructor(public payload?:any){}

}

export  class  LoadFailAction implements Action{
  type = DependenciesActionTypes.LOAD_FAIL;

  constructor(public payload?:any){}

}

export type Actions = LoadAction| LoadSuccessAction | LoadFailAction;
