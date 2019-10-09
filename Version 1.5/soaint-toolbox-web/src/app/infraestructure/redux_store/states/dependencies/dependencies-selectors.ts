import * as rootStore from "../../redux-reducers";
import {createSelector} from "@ngrx/store";

export const dependencieStore = (state: rootStore.State) => state.dependencies;

export  const getDependencies = createSelector(dependencieStore,state => state.dependencies);
