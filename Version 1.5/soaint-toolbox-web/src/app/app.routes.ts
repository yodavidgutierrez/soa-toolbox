import {Routes, RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';


export const APP_ROUTES: Routes = [
    {
      path: 'login',
      loadChildren: './ui/components/pages/auth/auth.module#AuthModule'
    },
    {path:'pages',
     loadChildren: './ui/components/pages/pages.module#PagesModule'
    },
    {path:'**', redirectTo:'/login'},

];

export const APP_ROUTES_MODULE: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES, {scrollPositionRestoration: 'enabled',useHash:true});
