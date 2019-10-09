import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExternalComponent } from './external.component';
import {RouterModule, Routes} from "@angular/router";
import {PRIMENG_MODULES} from "../../../../shared/primeNg/primeng-elements";
import {SharedModule} from "../../../../shared/shared/shared.module";
import {AppAccessGuard} from "../../../../infraestructure/guards/app-access.guard";
import { DashbuilderComponent } from './components/dashbuilder/dashbuilder.component';


const routes:Routes = [
  {
    path: 'dashbuilder',
    component:DashbuilderComponent,
    canActivate:[AppAccessGuard],
    data:{
      id: '3'
    }

  },
  {
    path:':id',
    component:ExternalComponent,
    canActivate:[AppAccessGuard]
  }
];


@NgModule({
  declarations: [ExternalComponent, DashbuilderComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    PRIMENG_MODULES
  ]
})
export class ExternalModule { }
