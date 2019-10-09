import {ApiBase} from "../api/api-base.service";
import {Observable} from "rxjs/Rx";
import {environment} from "../../../../environments/environment";
import {Injectable} from "@angular/core";

@Injectable()
export class DependenciesService {

  constructor(private _api:ApiBase){}

  list(): Observable<any>{

    return this._api.list(environment.endPoints.dependencies);
  }

}
