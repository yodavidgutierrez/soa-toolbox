
import { PRIMENG_MODULES } from './../../../shared/primeNg/primeng-elements';
import { AppInlineProfileComponent } from './profile/app.profile.component';
import { AppRightpanelComponent } from './right-panel/app.rightpanel.component';
import { AppMenuComponent, AppSubMenuComponent } from './menu/app.menu.component';
import { AppFooterComponent } from './footer/app.footer.component';
import { AppBreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppTopbarComponent } from './top-bar/app.topbar.component';
import { AdminLayoutComponentComponent } from './admin-layout-component/admin-layout-component.component';

@NgModule({
  declarations: [
      AppSubMenuComponent,
      AppMenuComponent,
      AppTopbarComponent,
      AppFooterComponent,
      AppBreadcrumbComponent,
      AppRightpanelComponent,
      AppInlineProfileComponent,
      AdminLayoutComponentComponent
    ],
  exports: [
    AppSubMenuComponent,
    AppMenuComponent,
    AppTopbarComponent,
    AppFooterComponent,
    AppBreadcrumbComponent,
    AppRightpanelComponent,
    AppInlineProfileComponent,
    AdminLayoutComponentComponent
  ],
  imports: [
    CommonModule,
    ...PRIMENG_MODULES
  ]
})
export class LayoutModule { }
