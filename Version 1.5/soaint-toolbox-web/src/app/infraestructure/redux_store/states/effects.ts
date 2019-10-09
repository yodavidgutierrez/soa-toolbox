import {LoginEffects} from "./authentication/login-effects";
import {RouterEffects} from "./navigation/effects";
import {LoginSandbox} from "./authentication/login-sandbox";
import {RolesEffects} from "./roles/roles-effects";
import {FuncionarioEffects} from "./funcionario/funcionario-effects";
import {DependenciesEffects} from "./dependencies/dependencies-effects";
import {ConstantesEffects} from "./constantes/constantes-effects";
import {Effects as NotificationEffects} from "./notification/effects";
import { FuncionarioSandbox} from "./funcionario/funcionario-sandbox";
import {RolesSandbox} from "./roles/roles-sandbox";
import {DependenciesSandbox} from "./dependencies/dependencies-sandbox";
import {ConstantesSandbox} from "./constantes/constantes-sandbox";
import {Sandbox as NotificationSandbox} from "./notification/sandbox";
import {MenuEffects} from "./menu/menu.effects";
import {MenuSandbox} from "./menu/menu.sandbox";

export const EFFECTS = [
  LoginEffects
  ,RouterEffects
  ,RolesEffects
  ,FuncionarioEffects
  ,DependenciesEffects
  ,ConstantesEffects
  ,NotificationEffects
  ,MenuEffects

];
export const REDUX_SANDBOXES = [
  LoginSandbox,
  FuncionarioSandbox,
  RolesSandbox,
  DependenciesSandbox,
  ConstantesSandbox,
  NotificationSandbox,
  MenuSandbox
];
