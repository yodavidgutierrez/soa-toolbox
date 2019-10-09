import {Component,  OnInit} from '@angular/core';
import {trigger, state, transition, style, animate} from '@angular/animations';
import {AdminLayoutComponentComponent} from "../admin-layout-component/admin-layout-component.component";
import { LoginSandbox } from 'src/app/infraestructure/redux_store/states/authentication/login-sandbox';


@Component({
    selector: 'app-inline-profile',
    templateUrl: './app.profile.component.html',
    animations: [
        trigger('menu', [
            state('hidden', style({
                height: '0px'
            })),
            state('visible', style({
                height: '*'
            })),
            transition('visible => hidden', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')),
            transition('hidden => visible', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
        ])
    ]
})
export class AppInlineProfileComponent implements OnInit{

    active: boolean;
     name:string;

    constructor(public app: AdminLayoutComponentComponent, public sandbox:LoginSandbox) {


    }

    onClick(event) {
        this.active = !this.active;
        setTimeout(() => {
          this.app.layoutMenuScrollerViewChild.moveBar();
        }, 450);
        event.preventDefault();
    }


  ngOnInit(): void {

   this.sandbox.selectProfile()
     .subscribe(usr => {this.name = usr.name.split(' ')[0] })
     .unsubscribe();
  }
}
