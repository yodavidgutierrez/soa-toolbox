import { Component, OnInit } from '@angular/core';
import {ExternalComponent} from "../../external.component";
import {ActivatedRoute, Router} from "@angular/router";
import {MenuSandbox} from "../../../../../../infraestructure/redux_store/states/menu/menu.sandbox";
import {LoginSandbox} from "../../../../../../infraestructure/redux_store/states/authentication/login-sandbox";
import {combineLatest} from "rxjs/index";

@Component({
  selector: 'app-dashbuilder',
  templateUrl: '../../external.component.html',
  styleUrls: ['../../external.component.scss']
})
export class DashbuilderComponent extends ExternalComponent {

  constructor(
    protected route: ActivatedRoute,
    protected router:Router,
    protected loginSandbox:LoginSandbox,
    protected menuSandbox:MenuSandbox
  ) {

    super(route,router,loginSandbox,menuSandbox);

    this.style.display = 'none';
  }


  login(){

    combineLatest(this.loginSandbox.selectProfile(), this.menuSandbox.menuOptions())
      .subscribe( ([profile, options ])=> {

        const option = options.find(opt => opt.idApplication == this.route.snapshot.data.id);

        const iframe = <HTMLIFrameElement> document.getElementById('external-page');

        const doc = iframe.contentDocument;

        doc.body.innerHTML = ' <form id="login-dashbuilder"   action="'+ option.Accesslink+'/j_security_check" method="POST">\n' +
          '    <p>\n' +
          '      <label>Usuario</label>\n' +
          '      <input value="'+profile.username+'" name="j_username" class="text-input" type="text" autofocus="">\n' +
          '    </p>\n' +
          '    <br style="clear: both;">\n' +
          '\n' +
          '    <p>\n' +
          '      <label>Contraseña</label>\n' +
          '      <input name="j_password" class="text-input" type="password" value="'+profile.password+'" autocomplete="new-password">\n' +
          '    </p>\n' +
          '    <br style="clear: both;">\n' +
          '\n' +
          '    <p>\n' +
          '      <input class="button" type="submit" value="Sign In">\n' +
          '    </p>\n' +
          '\n' +
          '  </form>';

        const domElement = <HTMLFormElement>doc.getElementById('login-dashbuilder');

        domElement.submit();

        setTimeout(() => {
          iframe.src = option.Accesslink;
          iframe.addEventListener('load', () => {
            this.style.display = 'block';
            this.isLoading = false;
          });

        },500 );

      })
      .unsubscribe();



  }

}
