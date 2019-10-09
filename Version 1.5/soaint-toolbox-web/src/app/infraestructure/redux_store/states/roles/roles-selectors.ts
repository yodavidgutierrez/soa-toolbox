import * as rootStore from "../../redux-reducers";
import {createSelector} from "@ngrx/store";

export  const rolStore = (state:rootStore.State) => state.roles;

export  const getRoles = createSelector(rolStore,state => state.roles);
