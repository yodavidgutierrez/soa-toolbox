import {Component, OnInit} from '@angular/core';
import {AdminLayoutComponentComponent} from "../admin-layout-component/admin-layout-component.component";
import {Observable} from "rxjs/Rx";
import {LoginSandbox} from "../../../../infraestructure/redux_store/states/authentication/login-sandbox";
import {isNullOrUndefined} from "util";
import {map} from "rxjs/internal/operators";
import {MenuDTO} from '../../../../shared/domain/MenuDTO';
import {MenuSandbox} from '../../../../infraestructure/redux_store/states/menu/menu.sandbox';
import {Store} from '@ngrx/store';
import {State} from '../../../../infraestructure/redux_store/states/authentication/login-reducers';
import {ADMIN_TOOLBOX_ROL} from "../../../../infraestructure/utils/roles.properties";
import { UserProfile } from '../../pages/auth/login/models/user-profile.model';



@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
    styleUrls:['./app.topbar.component.scss']

})
export class AppTopbarComponent implements OnInit {

    hasRoleAdmin$: Observable<boolean>;
    user$:Observable<UserProfile>;
    baseUrl = document.head.baseURI;
    constructor(public app: AdminLayoutComponentComponent,
                private _authSandbox: LoginSandbox,
                private menuSanbox: MenuSandbox,
                private _store: Store<State>) {

    }

  ngOnInit(): void {

      this.user$ =  this._authSandbox.selectProfile();

      this.hasRoleAdmin$ = this._authSandbox.selectProfile()
                              .pipe(map(profile => !isNullOrUndefined(profile)  && profile.roles.some( r => r.name ===ADMIN_TOOLBOX_ROL
                              )))
  }


  salir(){
      this._authSandbox.logoutDispatch();
  }





}
