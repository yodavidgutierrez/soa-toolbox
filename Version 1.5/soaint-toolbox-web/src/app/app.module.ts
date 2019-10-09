import { LoadingService } from './infraestructure/services/loading/loading.service';

import { NgModule, InjectionToken } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { APP_ROUTES_MODULE } from './app.routes';

//PrimeNG Modules
import { PRIMENG_MODULES } from './shared/primeNg/primeng-elements';

//Utils
import { HttpHandler } from './infraestructure/utils/http-handler';

//Componenst
import { AppComponent } from './app.component';
//Services
import { ServiceModule } from './infraestructure/services/service.module';
//NGRX
import {MetaReducer, StoreModule} from '@ngrx/store';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { PagesModule } from './ui/components/pages/pages.module';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LoginComponent } from './ui/components/pages/auth/login/login.component';
import { RegisterComponent } from './ui/components/pages/auth/register/register.component';
import { PageNotFoundComponent } from './ui/components/pages/page-not-found/page-not-found.component';
import { AuthenticatedGuard } from './ui/components/pages/auth/login/guards/auth.guard';
import {EffectsModule} from "@ngrx/effects";
import {EFFECTS, REDUX_SANDBOXES} from "./infraestructure/redux_store/states/effects";
import {storeFreeze} from "ngrx-store-freeze";
import {AuthService} from "./infraestructure/services/auth/auth.service";
import {AccessGuard} from "./infraestructure/guards/access.guard";
import {reducers, State} from "./infraestructure/redux_store/redux-reducers";
import {ToastModule} from "primeng/toast";
import {ToastrModule} from "ngx-toastr";
import {SharedModule} from "./shared/shared/shared.module";
import {HTTP_INTERCEPTORS_PROVIDER} from "./infraestructure/interceptors/http.provider";
const externalUrlProvider = new InjectionToken('externalUrlRedirectResolver');

export const metaReducers: MetaReducer<State>[] = !environment.production ? [storeFreeze]: [];

@NgModule({
    declarations: [
        AppComponent,
        RegisterComponent,
        PageNotFoundComponent

    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        ServiceModule,
        SharedModule,
        HttpClientModule,
        BrowserAnimationsModule,
        ...PRIMENG_MODULES,
        StoreModule.forRoot(reducers, { metaReducers }),
        EffectsModule.forRoot(EFFECTS),
        APP_ROUTES_MODULE,
        StoreRouterConnectingModule,
        ToastrModule.forRoot({
        closeButton: true, // show close button
        timeOut: 3000, // time to live
        enableHtml: true, // allow html in message. (UNSAFE)
        extendedTimeOut: 1000, // time to close after a user hovers over toast
        progressBar: true, // show progress bar
        newestOnTop: true, // new toast placement
        // preventDuplicates: true,
        // toastClass: string = 'toast'; // class on toast
        // positionClass: string = 'toast-top-right'; // class on toast
        // titleClass: string = 'toast-title'; // class inside toast on title
        // messageClass: string = 'toast-message';
      }),
        !environment.production
            ? StoreDevtoolsModule.instrument({ maxAge: 50 }) : []
    ],
    providers: [
      AuthService,
      HttpHandler,
      ...HTTP_INTERCEPTORS_PROVIDER,
      ...EFFECTS,
      ... REDUX_SANDBOXES
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
