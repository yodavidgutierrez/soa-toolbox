import {isNullOrUndefined} from "util";
import {ObjectHelper} from "../../utils/object.helper";
import {Observable} from "rxjs/Rx";

export  abstract class CacheResponse {


  private  requestsCached = {};

  private isCached(payload: any, endpoint: string): any {

    if(isNullOrUndefined(this.requestsCached[endpoint])  ){

      if( localStorage === undefined)
        return undefined;

      const item  =  localStorage.getItem(endpoint);

      if(!item)
        return undefined;

      this.requestsCached[endpoint] = JSON.parse(item);

    }

    return  this.requestsCached[endpoint].find(p =>  ObjectHelper.similar(p.payload, payload) );
  }

  protected getResponse(endpoint: string, defaultResponse:Observable<any> = Observable.empty(),payload?): Observable<any> {

    const payloadCached = this.isCached(payload, endpoint);

    return payloadCached === undefined  ? defaultResponse.do( r => this.cacheResponse(payload,r,endpoint)) : Observable.of(payloadCached.response);
  }

  private  cacheResponse(payload, response, endpoint) {

    if(this.requestsCached[endpoint] === undefined)
      this.requestsCached[endpoint] = [];

    this.requestsCached[endpoint].push({payload:payload,response:response});

    if(localStorage !== undefined){

      localStorage.setItem(endpoint,JSON.stringify(this.requestsCached[endpoint]));

      return;
    }
  }
}
