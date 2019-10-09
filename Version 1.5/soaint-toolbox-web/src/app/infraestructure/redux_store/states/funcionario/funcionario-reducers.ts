import {FuncionarioDTO} from "../../../../shared/domain/funcionarioDTO";
import {Action} from "@ngrx/store";
import {Actions, FuncionarioActionTypes} from "./funcionario-actions";
import {tassign} from "tassign";

export interface State {
    funcionarios: FuncionarioDTO[];
    funcionarioForEdit:FuncionarioDTO
}

 const initialState:State = {
  funcionarios : [],
  funcionarioForEdit:null
};
export function reducers( state = initialState, action:Action) {

const funcionario = Object.assign({},state.funcionarioForEdit);


  switch (action.type) {
    case FuncionarioActionTypes.LOAD_SUCCESS:
      return tassign(state, {funcionarios: (<Actions>action).payload});
    case FuncionarioActionTypes.SELECT_FUNCIONARIO_BY_EDIT :
      return tassign(state, {funcionarioForEdit: (<Actions>action).payload});
    case FuncionarioActionTypes.RESET :  return tassign(state, {funcionarioForEdit: null});
  }
  return state;
}
