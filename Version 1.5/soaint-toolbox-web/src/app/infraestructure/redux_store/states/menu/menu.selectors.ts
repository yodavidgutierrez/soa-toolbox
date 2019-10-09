import * as rootStore from "../../redux-reducers";
import {createSelector} from "@ngrx/store";
import {profileStore} from "../authentication/login-selectors";
import {isNullOrUndefined} from "util";

export const menuStore = (state: rootStore.State) => state.menu_options;

export  const getMenuOptions = createSelector(menuStore, state => state.menuOptions );

export const getMenuForAuthenticatedUser = createSelector(menuStore,profileStore,
  (menuState,profileState) =>menuState.menuOptions.filter( app => !isNullOrUndefined(profileState)  &&  profileState.roles.find(r => r.idApplication == app.idApplication)));

export  const getMenuForEdit = createSelector(menuStore, state => state.MenuForEdit);


