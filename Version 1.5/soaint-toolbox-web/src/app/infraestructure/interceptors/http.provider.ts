import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {HttpInterceptor} from "./http.interceptor";
import {Provider} from "@angular/core";
import {ErrorHandlerService} from "../services/error-handler/error-handler.service";

export const HTTP_INTERCEPTORS_PROVIDER:Provider[] =[{
  provide: HTTP_INTERCEPTORS,
  useClass:HttpInterceptor,
  multi:true
},
  ErrorHandlerService
]
