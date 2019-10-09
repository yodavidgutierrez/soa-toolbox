import {ConstanteDTO} from "../../../../shared/domain/constanteDTO";
import {Action} from "@ngrx/store";
import {Actions, ConstanteActionTypes} from "./constantes-actions";
import {tassign} from "tassign";

export interface State {
  tipoDocIdent: ConstanteDTO[];
}

const initialState:State = {
  tipoDocIdent:[]
};

export function reducers(state = initialState,action:Action) {


  switch (action.type){

    case ConstanteActionTypes.LOAD_COD_TIPO_DOC_IDENTIDAD : return tassign(state,{tipoDocIdent: (<Actions> action).payload})
  }

  return state;

}
