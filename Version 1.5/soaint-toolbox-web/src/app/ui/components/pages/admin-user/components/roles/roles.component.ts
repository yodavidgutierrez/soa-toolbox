import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {FuncionarioDTO} from "../../../../../../shared/domain/funcionarioDTO";
import {Observable, Subscription} from "rxjs/Rx";
import {RolDTO} from "../../../../../../shared/domain/rolesDTO";
import {FuncionarioSandbox} from "../../../../../../infraestructure/redux_store/states/funcionario/funcionario-sandbox";
import {FuncionarioService} from "../../../../../../infraestructure/services/funcionarios/funcionario.service";
import {RolesSandbox} from "../../../../../../infraestructure/redux_store/states/roles/roles-sandbox";
import {catchError, map, switchMap, tap, withLatestFrom} from "rxjs/internal/operators";
import {Sandbox as NotificationSandbox} from "../../../../../../infraestructure/redux_store/states/notification/sandbox";
import {LoginSandbox} from "../../../../../../infraestructure/redux_store/states/authentication/login-sandbox";
import {MenuSandbox} from "../../../../../../infraestructure/redux_store/states/menu/menu.sandbox";
import {MenuDTO} from "../../../../../../shared/domain/MenuDTO";
import {isNullOrUndefined} from "util";
import {of} from "rxjs/index";

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit,OnDestroy {

 selectedRoles$: Observable<RolDTO[]> ;

 activeIndex = 0;

 roles$: Observable<RolDTO[]>;

 applications$ : Observable<MenuDTO[]>;

 private selectedApp:MenuDTO;

 isSaving = false;


@Output() onRolesUpdated:EventEmitter<FuncionarioDTO> = new EventEmitter;

 subscriptions:Subscription[] = [];

 @Input() showButtonSave = true;

  constructor(
    private _rolesSandbox:RolesSandbox,
    private _authSandbox:LoginSandbox,
    private _funcSandbox:FuncionarioSandbox,
    private _funcService:FuncionarioService,
    private _notificationSandbox:NotificationSandbox,
    private _appSandbox: MenuSandbox
    ) {

  }

  ngOnInit() {

    this.applications$ = this._appSandbox.menuOptions();

    this.roles$ = this._rolesSandbox.list();

    this.selectedRoles$ = this._funcSandbox.getRolesForFuncionarioForEdit();

  }


  selectionChange(selection){

    let dispatched = false;

    this._funcSandbox.getFuncionarioForEdit()
      .subscribe(funcionario => {

        if(dispatched)
          return;

        if(isNullOrUndefined(this.selectedApp))
           return;

        const idApplication = this.selectedApp.idApplication;

        const roles = [
          ... funcionario.properties.roles.filter( r => r.idApplication != idApplication),
          ... selection
        ];

        const properties = Object.assign({},funcionario.properties,{roles:roles}) ;

        const func =Object.assign({},funcionario,{properties:properties});

        dispatched = true;

        this._funcSandbox.setFuncionarioForEdit(func);
      })
      .unsubscribe();

  }
  saveRoles(){

    this.isSaving = true;
   const subscription =   this._funcSandbox.getFuncionarioForEdit()
      .subscribe(func => {
        this._funcService.updateRoles(func.id,func.properties.roles || [])
                   .pipe( map(() => func) )
                   .subscribe((f) => {

            this.isSaving = false;

            this._notificationSandbox.notify({severity:'success',summary: `los roles del funcionario ${f.name} se han actualizado correctamente`});

            this.onRolesUpdated.emit(f);

            let updatedProfile = false;

            this._authSandbox.selectProfile().subscribe(profile => {

              if(isNullOrUndefined(profile) || updatedProfile)
                 return;
              if(f.id === profile.id){

                updatedProfile = true;

                this._authSandbox.updateProfile({
                  id:profile.id,
                  email:profile.email,
                  password: profile.password,
                  username:profile.username,
                  roles:f.properties.roles || [],
                  name:profile.name
                })

              }



            })
              .unsubscribe();

            subscription.unsubscribe();
          });
      })
     ;




  }

  resetTabs(){

    this._appSandbox.load();
    this.activeIndex = 0;

    this.loadRoles({index:0});
  }

  loadRoles(event:any){

    this.applications$.map(apps => apps[event.index])
      .subscribe( app => {
        if(!isNullOrUndefined(app)){
          this.selectedApp  = app;
          this._rolesSandbox.load(app.idApplication);
          return;
        }

        this.selectedApp = null;

      } )
      .unsubscribe()
  }



  ngOnDestroy(): void {

    this.subscriptions.forEach(s => s.unsubscribe());
  }

}
