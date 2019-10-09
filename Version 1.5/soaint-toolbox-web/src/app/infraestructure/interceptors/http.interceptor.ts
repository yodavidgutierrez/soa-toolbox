
import {Observable} from 'rxjs';
import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor as BaseHttpInterceptor,
    HttpRequest
} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {catchError, tap} from 'rxjs/internal/operators';
import { LoadingService } from '../services/loading/loading.service';
import { ErrorHandlerService } from '../services/error-handler/error-handler.service';

@Injectable()
export class HttpInterceptor  implements  BaseHttpInterceptor {


    filteredUrlPatterns: RegExp[] = [];
    pendingRequests = 0;


    constructor( private errorHandlerService: ErrorHandlerService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {

       /* if (this.shouldBypass(req.url)) {
            this.pendingRequests++;

            if (1 === this.pendingRequests) {
                this.loadingService.presentLoading();
            }
        }*/



      return next.handle(req).pipe(tap( () => {

        localStorage.setItem("toolboxLastActivity",new Date().getTime().toString());

         /* if (this.shouldBypass(req.url)) {
              this.pendingRequests --;

              if (0 === this.pendingRequests) {
                  this.loadingService.dismissLoading();
              }
          }*/
      }), catchError( error => {

        //  this.loadingService.dismissLoading();

          return this.errorHandlerService.handleError(error);

      }));

    }

    private shouldBypass(url: string): boolean {
        return this.filteredUrlPatterns.some(e => {
            return e.test(url);
        });
    }







}
