import {Injectable} from '@angular/core';
import {HttpHandler} from '../../utils/http-handler';
import {Observable} from 'rxjs';

@Injectable()
export class ApiBase {

    constructor(protected _http: HttpHandler) {
    }

    public list(endpoint: string, payload = {}): Observable<any> {
        return this._http.get(endpoint, payload);
    }

    public post(endpoint: string, payload = {}): Observable<any> {
        return this._http.post(endpoint, payload);
    }

    public put(endpoint: string, payload = {}): Observable<any> {
        return this._http.put(endpoint, payload);
    }

    public delete(endpoint: string, payload = {}): Observable<any> {
        return this._http.delete(endpoint, payload);
    }

    public sendFile(endpoint: string, formData, pathParams: Array<string>): Observable<any> {

        let fullEndpoint = `${endpoint}`;
        pathParams.forEach((value) => {
            fullEndpoint += `/${value}`;
        });
        return this._http.putFile(fullEndpoint, formData);
    }

}
