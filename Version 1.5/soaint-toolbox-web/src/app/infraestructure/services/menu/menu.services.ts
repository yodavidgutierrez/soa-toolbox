import {Injectable} from "@angular/core";
import {ApiBase} from "../api/api-base.service";
import {Observable} from "rxjs/Rx";
import {environment} from "../../../../environments/environment";
import {MenuDTO} from "../../../shared/domain/MenuDTO";

@Injectable()
export class MenuServices {

  constructor(private _api:ApiBase){}

  list(): Observable<any>{

    const endpoint = environment.endPoints.menu;

    return this._api.list(endpoint);
  }

  edit(app:MenuDTO){

    const endpoint = environment.endPoints.menu_edit;

    return this._api.put(`${endpoint}/${app.idApplication}`, app);
  }

}
