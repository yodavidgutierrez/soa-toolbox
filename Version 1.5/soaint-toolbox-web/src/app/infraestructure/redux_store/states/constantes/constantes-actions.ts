import {type} from "../../redux-util";
import {Action} from "@ngrx/store";

export const ConstanteActionTypes = {
  LOAD:type('[ConstanteDTO] LoadAction'),
  LOAD_COD_TIPO_DOC_IDENTIDAD: type('[ConstanteDTO] LoadCodTipoDocIdentAction')

};

export  class LoadAction implements  Action{

  type = ConstanteActionTypes.LOAD;

  constructor(public payload?:any){}

}

export  class LoadTipoDocIdentidadAction implements  Action{

   type = ConstanteActionTypes.LOAD_COD_TIPO_DOC_IDENTIDAD;

   constructor(public payload?:any){}

}

export type Actions = LoadAction|LoadTipoDocIdentidadAction;
