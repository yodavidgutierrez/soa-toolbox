import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {AdminUserComponent} from "./admin-user.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PRIMENG_MODULES} from "../../../../shared/primeNg/primeng-elements";
import { ProfileComponent } from './components/profile/profile.component';
import { RolesComponent } from './components/roles/roles.component';
import { DependenciesComponent } from './components/dependencies/dependencies.component';
import {SharedModule} from "../../../../shared/shared/shared.module";
import {AuthGuard} from "../../../../infraestructure/guards/auth.guard";
import {AccessGuard} from "../../../../infraestructure/guards/access.guard";
import {ADMIN_TOOLBOX_ROL} from "../../../../infraestructure/utils/roles.properties";

const routes:Routes = [{
  path:'',
  component: AdminUserComponent,
  canActivate:[AccessGuard],
  data:{
    rolesAllowed: ADMIN_TOOLBOX_ROL,
  }},
  {
  path:'profile',
  component: ProfileComponent,
  canActivate:[AuthGuard],
  data:{
    ownProfile:true,
  }}
  ];

@NgModule({
  declarations: [
    AdminUserComponent,
    ProfileComponent,
    RolesComponent,
    DependenciesComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    ...PRIMENG_MODULES,

  ]
})
export class AdminUserModule { }
