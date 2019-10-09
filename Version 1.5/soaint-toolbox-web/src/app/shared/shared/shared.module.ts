import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PRIMENG_MODULES} from "../primeNg/primeng-elements";
import {AuthGuard} from "../../infraestructure/guards/auth.guard";
import {AccessGuard} from "../../infraestructure/guards/access.guard";
import {AppAccessGuard} from "../../infraestructure/guards/app-access.guard";
import {InputFileDirective} from '../directive/input-file.directive';

@NgModule({
  declarations: [
    InputFileDirective
  ],
  providers:[
    AuthGuard,
    AccessGuard,
    AppAccessGuard
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ...PRIMENG_MODULES,
  ],
  exports: [InputFileDirective]
})
export class SharedModule { }
