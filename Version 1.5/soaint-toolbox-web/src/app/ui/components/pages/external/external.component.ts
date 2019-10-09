import {AfterViewInit, Component} from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";
import {ActivatedRoute, Router} from "@angular/router";
import {LoginSandbox} from "../../../../infraestructure/redux_store/states/authentication/login-sandbox";
import {MenuSandbox} from "../../../../infraestructure/redux_store/states/menu/menu.sandbox";
import {combineLatest} from "rxjs/index";
import {isNullOrUndefined} from "util";




@Component({
  selector: 'app-external',
  templateUrl: './external.component.html',
  styleUrls: ['./external.component.scss']
})
export class ExternalComponent implements AfterViewInit {

  isLoading = true;
  notFound = false;
  notFoundMessage = 'No se han encontrado applicaciones para este usuario';

  style:any = {
    width: '100%',
    'min-height': '500px',
    height:'max-content'
  };

 readonly totalHeight = window.innerHeight;

 private readonly applicationToRedirect = {'3':['/pages/application/dashbuilder']}

  constructor(
              protected route: ActivatedRoute,
              protected router: Router,
              protected loginSandbox:LoginSandbox,
              protected menuSandbox:MenuSandbox
              ) {

  }

  ngAfterViewInit(): void {

   this.route.params.subscribe( (params) => {

    this.notFound  = params.id == 'notfound';

    if(!this.notFound){
      this.isLoading = true;

      setTimeout(() => {
        this.login();
      },100);
    }

    else
      this.isLoading = false;
   });

  }

  login(){

 combineLatest(this.loginSandbox.selectProfile(), this.menuSandbox.menuOptions())
     .subscribe( ([profile, options ])=> {

      const option = options.find(opt => opt.idApplication == this.route.snapshot.params.id);

       if(!isNullOrUndefined(this.applicationToRedirect[option.idApplication])){
            this.router.navigate(this.applicationToRedirect[option.idApplication]);
            return;
       }

     const iframe = <HTMLIFrameElement> document.getElementById('external-page');

      sessionStorage.setItem('toolboxRequestApp','true');

     const parts = option.Accesslink.toString().split('/').filter((_,index) => index<3);

       const origin = parts.join('/');


     const payload ={
         'user': profile.username,
         'password': profile.password
       };


         iframe.addEventListener('load',() => {

           setTimeout(() => {

              iframe.style.height =`${window.outerHeight - 150}px`;
           });

           try{
                iframe.contentWindow.postMessage(payload,origin);
            }catch (e) {

             this.notFound = true;
             this.notFoundMessage = "No se puedo cargar la url";

           }
           finally {
             this.isLoading = false;
           }


       });

       iframe.src = option.Accesslink;


     })
     .unsubscribe();
  }

}
