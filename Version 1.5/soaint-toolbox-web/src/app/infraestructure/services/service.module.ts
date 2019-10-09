import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as fromServices from './service.index';
import {baseUrl} from 'src/environments/environment';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    { provide: 'BASE_URL',        useValue: baseUrl },
    ...fromServices.SERVICES,
  ],
  declarations: []
})
export class ServiceModule { }
