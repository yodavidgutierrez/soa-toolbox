import { Store } from '@ngrx/store';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { isNullOrUndefined } from 'util';
import { LoginSandbox } from 'src/app/infraestructure/redux_store/states/authentication/login-sandbox';
import { LoginAction } from 'src/app/infraestructure/redux_store/states/authentication/login-actions';
import {State} from "../../../../../infraestructure/redux_store/redux-reducers";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loading$: Observable<boolean>;
  public error$: Observable<string>;
  public form: FormGroup;
  baseUrl = document.head.baseURI;

  subscriptions: Subscription[] = [];


  constructor(private _sandbox: LoginSandbox,
    private _formBuilder: FormBuilder,
              private _store:Store<State>
  ) {
    this.initForm();
  }

  ngOnInit() {
        this.loading$ = this._sandbox.selectorLoading();
        this.error$ = this._sandbox.selectorError();
  }

  initForm(){
    this.form = this._formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  /**
   * Submit the authentication form.
   * @method signUp
   */
  public signIn() {
    // get email and password values
    const username: string = this.form.get('username').value.trim();
    const password: string = this.form.get('password').value.trim();

    // set payload
    const payload = {
      username: username,
      password: password
    };
    const action = new LoginAction(payload);
    this._store.dispatch(action);
  }
}
