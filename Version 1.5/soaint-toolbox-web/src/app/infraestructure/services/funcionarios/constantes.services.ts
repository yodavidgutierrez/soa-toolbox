import {CacheResponse} from "../bases/CacheResponse";
import {ApiBase} from "../api/api-base.service";
import {environment} from "../../../../environments/environment";
import {Injectable} from "@angular/core";

@Injectable()
export class ConstantesServices extends CacheResponse{

  constructor(private _api:ApiBase){
    super();
  }

  getTiposDocIdent(){

    const endpoint = environment.endPoints.tiposDocIdent;

   return this.getResponse(endpoint,this._api.list(endpoint));

  }

}
