import {Injectable} from "@angular/core";
import {ApiBase} from "../api/api-base.service";
import {Observable} from "rxjs/Rx";
import {environment} from "../../../../environments/environment";

@Injectable()
export  class FuncionarioService {


  constructor(private _api:ApiBase){

  }

  list(params?): Observable<any>{
     return this._api.list(environment.endPoints.users,params)
  }

  update(user):Observable<any>{
    const endpoint = environment.endPoints.update_user;
    return this._api.put(`${endpoint}/${user.id}`, user);
  }

  roles(user_id){
    const endpoint = environment.endPoints.update_user;
    return this._api.list(`${endpoint}/${user_id.id}`);
  }

  updateRoles(id_user,roles):Observable<any>{
    const endpoint = environment.endPoints.update_roles;
    return this._api.put( `${endpoint}/${id_user}/roles`, roles)
  }

  updateDependencies(dependencies):Observable<any>{

    return this._api.put(environment.endPoints.update_dependencias,dependencies);
  }

  findbyname(username){
    return this._api.list(`${environment.endPoints.users}/${username}`)
  }

}
