import {Injectable} from "@angular/core";
import {ApiBase} from "../api/api-base.service";
import {environment} from "../../../../environments/environment";
import {Observable} from "rxjs/Rx";

@Injectable()
export  class RolesService {

  constructor(private  _api:ApiBase){
  }

  list(idApplication):Observable<any>{

    const endpoint = environment.endPoints.roles;

    return this._api.list(`${endpoint}/${idApplication}`);
  }

}
