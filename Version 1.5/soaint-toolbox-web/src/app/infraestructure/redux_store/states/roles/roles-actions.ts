import {type} from "../../redux-util";
import {Action} from "@ngrx/store";

export const RolesActionTypes = {
  LOAD_SUCCESS: type('[RolDTO] LoadSuccessAction'),
  LOAD: type('[RolDTO] LoadAction'),
  LOAD_FAIL: type('[RolDTO] LoadAllFailAction'),
};

export  class  LoadAction implements Action{
  type = RolesActionTypes.LOAD;

  constructor(public payload?:any){}

}

export  class  LoadSuccessAction implements Action{
  type = RolesActionTypes.LOAD_SUCCESS;

  constructor(public payload?:any){}

}

export  class  LoadFailAction implements Action{
  type = RolesActionTypes.LOAD_FAIL;

  constructor(public payload?:any){}

}

export type Actions = LoadAction| LoadSuccessAction | LoadFailAction;
