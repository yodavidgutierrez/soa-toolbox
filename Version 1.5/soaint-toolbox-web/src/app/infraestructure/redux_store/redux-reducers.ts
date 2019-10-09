import * as fromRouter from '@ngrx/router-store';
import * as loginStore from './states/authentication/login-reducers';
import * as Notification from './states/notification/reducers';
import * as Funcionario from './states/funcionario/funcionario-reducers';
import * as Roles from './states/roles/roles-reducers';
import * as Dependencie from './states/dependencies/dependencies-reducers';
import * as Constantes from './states/constantes/constante-reducers';
import * as MenuStore from './states/menu/menu.reducers';

/**
 * As mentioned, we treat each reducer like a table in a database. This means
 * our top level state interface is just a map of keys to inner state types.
 */
export interface State {
  router: fromRouter.RouterReducerState;
  auth: loginStore.State;
  notification: Notification.State ;
  funcionario: Funcionario.State;
  roles: Roles.State;
  dependencies: Dependencie.State;
  constantes:Constantes.State;
  menu_options:MenuStore.State
}


/**
 * Because metareducers take a reducer function and return a new reducer,
 * we can use our compose helper to chain them together. Here we are
 * using combineReducers to make our top level reducer, and then
 * wrapping that in storeLogger. Remember that compose applies
 * the result from right to left.
 */
export const reducers = {
  auth: loginStore.reducer,
  router: fromRouter.routerReducer,
  notification: Notification.reducer,
  funcionario: Funcionario.reducers,
  roles: Roles.reducers,
  dependencies: Dependencie.reducers,
  constantes:Constantes.reducers,
  menu_options:MenuStore.reducers
};


