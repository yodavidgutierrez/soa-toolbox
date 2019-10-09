import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {select, Store} from '@ngrx/store';
import {map, switchMap, take} from 'rxjs/internal/operators';
import {dataSource} from "./mocks";
import {State} from "../redux_store/redux-reducers";

@Injectable()
export class HttpHandler {

    private token$: Observable<string>;

    constructor(private _http: HttpClient, private _store: Store<State>) {
        this.token$ = _store.pipe(select(s => s.auth.token));
    }

    requestHelper(url: string , method: string, options?: any): Observable<HttpResponse<any>> {



        return this.token$.pipe(take(1), switchMap(token => {
            // console.log('Calling protected URL ...', token);

            options = options || {responseType: 'json', observe: 'events'};
            options.headers = options.headers || new HttpHeaders();
            if(!options.headers.has('Content-Type'))
             options.headers = options.headers.append('Content-Type', 'application/json');

          if (token !== null) {
              options.headers =  options.headers.append('Authorization', 'Bearer ' + token);
            }


          if(/^http:\/\/mock\/.+$/.test(url)){

            const parts = url.split('/');


            return this.handleMockResponse(parts[parts.length -1], Object.assign({},options.params || {}, options.body  || {}));

          }

          if (options.body && typeof options.body !== 'string') {
            options.body = JSON.stringify(options.body);
          }

          const   request$ = this._http.request(method, url, options);

            return this.handleResponse(request$);
        }));

    }

    uploadHelper(url: string , options?: any): Observable<HttpResponse<any>> {
        return this.token$.pipe(take(1), switchMap(token => {
            options = options || {responseType: 'blob', observe: 'response'};
            options.headers = new HttpHeaders();
            options.headers.append('Accept', 'application/json');
            if (token !== null) {
                options.headers.append('Authorization', 'Bearer ' + token);
            }

            const request$ = this._http.request(url, 'post', options);
            return this.handleResponse(request$);
        }));
    }

    handleResponse(request$: Observable<HttpResponse<any>|ArrayBuffer>): Observable<HttpResponse<any>> {


        return request$.pipe(map((res: HttpResponse<any>) => {


          const type = res.headers.get('content-type').split(';')[0];

            if ('application/json' === type) {
                return res.body;
            }
            return res;
        }));
    }

    handleMockResponse(key,params?:any):Observable<HttpResponse<any>>{

        if(typeof  dataSource[key] === 'function')
          return of(dataSource[key](params)) ;

        return of(dataSource[key]);
    }



    public get(url: string, params: any, options?: any): Observable<HttpResponse<any>> {

        options = options || {observe: 'response', responseType : 'json'};

        options.params = params;

        return this.requestHelper( url, 'get', options);
    }

    public post(url: string, body: any, options?: any): Observable<HttpResponse<any>> {

        options = options || {observe: 'response', responseType : 'json'};

        options.body = body;

        return this.requestHelper(url, 'post', options);
    }

    public put(url: string, body: any, options ?: any): Observable<HttpResponse<any>> {

        options = options || {observe: 'response', responseType : 'json'};

        options.body = body;

        return this.requestHelper(url, 'put', options);
    }

    public delete(url: string, options ?: any): Observable<HttpResponse<any>> {
        return this.requestHelper(url, 'delete', options);
    }

    public patch(url: string, body: any, options?: any): Observable<HttpResponse<any>> {

        options = options || {observe: 'response', responseType : 'json'};

        options.body = body;

        return this.requestHelper(url, 'patch', options);
    }

    public putFile(url: string, body: any, options ?: any): Observable<HttpResponse<any>> {

        options = options || {observe: 'response', responseType : 'json'};

        options.body = body;

        return this.uploadHelper(url, options);
    }



}
