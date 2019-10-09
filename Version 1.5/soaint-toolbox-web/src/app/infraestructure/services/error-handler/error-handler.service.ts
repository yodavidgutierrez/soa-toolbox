import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {Sandbox as NotificationSandbox} from "../../redux_store/states/notification/sandbox";
import {HttpErrorResponse} from "@angular/common/http";


@Injectable()
export  class  ErrorHandlerService {


    constructor(private notificationSandbox:NotificationSandbox) {

    }



    handleError(error:HttpErrorResponse):Observable<never> {
        this.notificationSandbox.showConnectionError(error.status);
        return throwError(error);
    }
}
