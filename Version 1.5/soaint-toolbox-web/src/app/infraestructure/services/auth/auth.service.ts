import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {environment} from "../../../../environments/environment";
import {ApiBase} from "../api/api-base.service";

@Injectable()
export class AuthService {

  constructor(
       private _api: ApiBase
  ) {
  }

  login(user: any): Observable<any> {

    return this._api.post(`${environment.endPoints.users}/${user.login}`, {password:user.password});
  }

}
