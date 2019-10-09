import {Action, props, createAction} from '@ngrx/store';
import {type} from "../../redux-util";

export const FuncionarioActionTypes = {
  LOAD_SUCCESS: type('[FuncionarioDTO] LoadSuccessAction'),
  LOAD: type('[FuncionarioDTO] LoadAction'),
  SELECT_FUNCIONARIO_BY_EDIT: type('[FuncionarioDTO] SelectFuncionarioByEditAction'),
  LOAD_FAIL: type('[FuncionarioDTO] LoadAllFailAction'),
  RESET: type('[FuncionarioDTO] ResetAction'),


};



export class LoadSuccessAction  implements Action{

  type = FuncionarioActionTypes.LOAD_SUCCESS;

  constructor(public payload?: any) { }
}

export  class LoadAction  implements  Action{

  type = FuncionarioActionTypes.LOAD;

  constructor(public payload?: any) { }
}

export  class SelectFuncionarioByEditAction  implements  Action{

  type = FuncionarioActionTypes.SELECT_FUNCIONARIO_BY_EDIT;

  constructor(public payload?: any) { }
}

export  class ResetAction  implements  Action{

  type = FuncionarioActionTypes.RESET;

  constructor(public payload?: any) { }
}

export  class LoadFailAction  implements  Action{

  type = FuncionarioActionTypes.LOAD_FAIL;

  constructor(public payload?: any) { }
}
export type Actions = LoadAction|LoadFailAction|LoadSuccessAction
                      |SelectFuncionarioByEditAction;





