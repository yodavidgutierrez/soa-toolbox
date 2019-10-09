import {Component, ViewChild, AfterViewInit} from '@angular/core';
import {ScrollPanel} from 'primeng/primeng';
import {AdminLayoutComponentComponent} from "../admin-layout-component/admin-layout-component.component";

@Component({
    selector: 'app-rightpanel',
    templateUrl: './app.rightpanel.component.html'
})
export class AppRightpanelComponent implements AfterViewInit {

    @ViewChild('scrollRightPanel') rightPanelMenuScrollerViewChild: ScrollPanel;

    constructor(public app: AdminLayoutComponentComponent) {}

    ngAfterViewInit() {
      setTimeout(() => {this.rightPanelMenuScrollerViewChild.moveBar(); }, 100);
    }
}
