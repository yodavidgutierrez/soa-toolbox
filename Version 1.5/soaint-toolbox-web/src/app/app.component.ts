import {Component,  OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import  {State as RootState} from "./infraestructure/redux_store/redux-reducers";
import {LoginSuccessAction} from "./infraestructure/redux_store/states/authentication/login-actions";
import {LoadAction} from "./infraestructure/redux_store/states/menu/menu.actions";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit  {
    constructor(private _store:Store<RootState>){

      this.restore();
    }

    ngOnInit(){

    }

  private  restore(){

    const requestApp =  sessionStorage.getItem('toolboxRequestApp');

    if(window.performance.navigation.type != PerformanceNavigation.TYPE_RELOAD && !requestApp  ){

      this.clearStoredData();

      return;
    }

    sessionStorage.removeItem('toolboxRequestApp');

    if(!localStorage.getItem("toolboxSession") || !localStorage.getItem("toolboxLastActivity")){

      this.clearStoredData();

      return;
    }


    const lastActivity = parseInt(localStorage.getItem("toolboxLastActivity"));

    const currentTime = new Date().getTime();

    if(currentTime - lastActivity > 300000){

      this.clearStoredData();

      return;
    }
    const sessionData = JSON.parse(localStorage.getItem("toolboxSession"));

    sessionData.credentials.password = atob(sessionData.credentials.password);

    this._store.dispatch(new LoadAction(false));

    this._store.dispatch(new LoginSuccessAction({...sessionData,noSaveSession: true,isRefreshPage:true}));

  }

  private clearStoredData(){
    localStorage.removeItem("toolboxLastActivity");
    localStorage.removeItem("toolboxSession");

  }


}
