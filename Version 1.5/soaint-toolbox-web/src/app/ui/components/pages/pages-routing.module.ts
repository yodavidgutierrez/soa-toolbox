import { DashboardComponent } from './dashboard/dashboard.component';
import { Routes, RouterModule } from '@angular/router';
import {PagesComponent} from "./pages.component";
import {AuthGuard} from "../../../infraestructure/guards/auth.guard";


//Array of routes
const PAGES_ROUTES: Routes = [
  {path:'',
    component:PagesComponent,
    children:[
      {path: 'dashboard', component: DashboardComponent, canActivate:[AuthGuard]},
      {
        path:'admin-user',
        loadChildren: './admin-user/admin-user.module#AdminUserModule'
      },
      {
        path: 'application',
        loadChildren: './external/external.module#ExternalModule'
      },
      {
        path: 'menu-admin',
        loadChildren: './menu-admin/menu-admin.module#MenuAdminModule'
      }
    ]
  }


];

export const PAGES_ROUTES_MODULE = RouterModule.forChild(PAGES_ROUTES);
