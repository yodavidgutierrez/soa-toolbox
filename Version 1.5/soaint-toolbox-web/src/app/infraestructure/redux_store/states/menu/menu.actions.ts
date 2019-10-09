import {type} from "../../redux-util";
import {Action} from "@ngrx/store";

export const MenuActions = {
  LOAD_SUCCESS: type('[MenuDTO] LoadSuccessAction'),
  LOAD: type('[MenuDTO] LoadAction'),
  LOAD_FAIL: type('[MenuDTO] LoadAllFailAction'),
  CLEAR: type('[MenuDTO] ClearAction'),
  SELECT_MENU_BY_EDIT: type('[MenuDto] EditForMenuAction')
};

export  class  LoadAction implements Action{
  type = MenuActions.LOAD;

  constructor(public payload?:any){}

}

export  class  ClearAction implements Action{
  type = MenuActions.CLEAR;

  constructor(public payload?:any){}

}

export  class  LoadSuccessAction implements Action{
  type = MenuActions.LOAD_SUCCESS;

  constructor(public payload?:any){}

}

export  class  LoadFailAction implements Action{
  type = MenuActions.LOAD_FAIL;

  constructor(public payload?:any){}

}

export  class SelectMenuByEditAction  implements Action{
  type = MenuActions.SELECT_MENU_BY_EDIT;

  constructor(public payload?:any){}

}

export type Actions = LoadAction| LoadSuccessAction | LoadFailAction| ClearAction | SelectMenuByEditAction;
