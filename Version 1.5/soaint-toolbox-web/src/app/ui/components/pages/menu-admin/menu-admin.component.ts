import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MenuDTO} from '../../../../shared/domain/MenuDTO';
import {MenuServices} from '../../../../infraestructure/services/menu/menu.services';
import {MenuSandbox} from '../../../../infraestructure/redux_store/states/menu/menu.sandbox';
import {Observable} from '../../../../../../node_modules/rxjs/Rx';

@Component({
  selector: 'app-menu-admin',
  templateUrl: './menu-admin.component.html',
  styleUrls: ['./menu-admin.component.scss']
})
export class MenuAdminComponent implements OnInit {

  form: FormGroup;
  menu: MenuDTO;
  validations: any = {};
  menus$: Observable<MenuDTO[]>;
  showDialog: boolean;
  app: MenuDTO;

  constructor(
            private formBuilder :FormBuilder,
            private menuServices :MenuServices,
            private _menuSandbox :MenuSandbox
  ) {
    this.initForm();
  }

  ngOnInit() {
    this.menus$ = this._menuSandbox.menuOptions();
    this._menuSandbox.load( );
  }

  private initForm(){

    this.form = this.formBuilder.group({
      id:[null, ],
      visualizationName:[null,],
      link:[null, ],
      roles:[null, ],
    })

  }

  searchaplicaciones(){

    this._menuSandbox.load();

  }

  show(app: MenuDTO){

    this._menuSandbox.setMenuForEdit(app);
    this.showDialog = true;

  }

  hide(){

    this.showDialog = false;

  }

}
