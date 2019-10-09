import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MenuAdminComponent} from './menu-admin.component';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../../../../shared/shared/shared.module';
import {AccessGuard} from '../../../../infraestructure/guards/access.guard';
import { PRIMENG_MODULES } from "../../../../shared/primeNg/primeng-elements";
import { AplicacionesComponent } from './components/aplicaciones/aplicaciones.component';
import {ADMIN_TOOLBOX_ROL} from "../../../../infraestructure/utils/roles.properties";


const routes:Routes = [{
  path: '',
  component: MenuAdminComponent,
  data: {
    rolesAllowed:  ADMIN_TOOLBOX_ROL
  },
  canActivate:[AccessGuard]
}];

@NgModule({
  declarations: [
    MenuAdminComponent,
    AplicacionesComponent
  ],

  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild(routes),
    ...PRIMENG_MODULES,
  ]
})
export class MenuAdminModule { }
