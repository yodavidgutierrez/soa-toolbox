import * as rootStore from "../../redux-reducers";
import {createSelector} from "@ngrx/store";

export  const  constanteStore = (state:rootStore.State) => state.constantes;

export const getCodDocTipoIdent = createSelector(constanteStore,state => state.tipoDocIdent);
