import {Component, OnInit, Inject, Pipe, PipeTransform, AfterViewInit, OnDestroy} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { LoginSandbox } from 'src/app/infraestructure/redux_store/states/authentication/login-sandbox';
import { switchMap } from 'rxjs-compat/operator/switchMap';
import {Subscription} from "rxjs/Rx";

@Component({
    templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit, AfterViewInit {
    doc: any;

    scheduleOptions: any;
    private url: SafeResourceUrl;
    constructor(public router: Router, private loginSandbox:LoginSandbox, @Inject(DOCUMENT) doc, private sanitizer: DomSanitizer) {

        this.doc = doc;
        this.sanitizer = sanitizer;

    }
    getUrl() {
   return this.sanitizer.bypassSecurityTrustResourceUrl('http://192.168.1.44:28080/soaint-sgd-web');
    }
    ngOnInit() {

      const iFrame:HTMLIFrameElement = <HTMLIFrameElement>document.getElementById('iframe');

     iFrame.src = 'http://127.0.0.1:4300/#/login';

      iFrame.addEventListener('load',() => {

       this.loginSandbox.selectProfile().subscribe(profile => {

          const arr = 'soaint2'+ btoa(JSON.stringify(profile));

          iFrame.contentWindow.postMessage(arr, "http://127.0.0.1:4300");


        }).unsubscribe();
      });




    }

    go() {
        this.doc.location.assign("http://google.com");
    }

    ngAfterViewInit() {
        var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
        var eventer = window[eventMethod];
        var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";
        eventer(messageEvent, (e) => {
            if (e.data == "redirect") {
                this.router.navigate(['/utils']);
            }
        }, false);
    }


}
