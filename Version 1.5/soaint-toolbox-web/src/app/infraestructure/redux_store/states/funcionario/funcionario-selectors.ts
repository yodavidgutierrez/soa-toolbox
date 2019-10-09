import * as rootStore from "../../redux-reducers";
import {createSelector} from "@ngrx/store";
import {getRoles} from "../roles/roles-selectors";
import {getDependencies} from "../dependencies/dependencies-selectors";
import {isNullOrUndefined} from "util";

export const funcionarioStore = (state: rootStore.State) => state.funcionario;

export const getFuncionarios = createSelector(funcionarioStore, state => state.funcionarios);

export  const  getFuncionarioForEdit = createSelector(funcionarioStore, state => state.funcionarioForEdit);

export const getRolesForFuncionarioForEdit = createSelector(getFuncionarioForEdit,getRoles,
  (funcionarioState,rolesState) =>  rolesState.filter(rol => {

    if(isNullOrUndefined(funcionarioState))
       return false;

    const roles =  funcionarioState.properties.roles || [];

     return (<any[]>roles).some(r => rol.name === r.name && rol.idApplication == r.idApplication);
  }));

export const  getDependenciesForFuncionarioEdit = createSelector(getFuncionarioForEdit,getDependencies,
  (funcionarioState,dependencieState) => dependencieState.filter( dep =>  {

    if(isNullOrUndefined(funcionarioState))
       return false;

    const dependencies =  funcionarioState.properties.dependencias || [];


    return (<any[]>dependencies).some(d => dep.codigo === d.codigo);
  }));
