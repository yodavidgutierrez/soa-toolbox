import { PAGES_ROUTES_MODULE } from './pages-routing.module';
import { LayoutModule } from '../layouts/layout.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../../../shared/shared/shared.module";

@NgModule({
  declarations: [
       DashboardComponent,
       PagesComponent,

  ],
  exports: [

  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    LayoutModule,
    PAGES_ROUTES_MODULE
  ]

})
export class PagesModule { }
