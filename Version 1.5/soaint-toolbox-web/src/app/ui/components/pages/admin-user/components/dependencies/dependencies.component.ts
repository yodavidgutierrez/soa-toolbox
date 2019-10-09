import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable, Subscription} from "rxjs/Rx";
import {DependenciaDTO} from "../../../../../../shared/domain/dependenciaDTO";
import {Sandbox as NotificationSandbox} from "../../../../../../infraestructure/redux_store/states/notification/sandbox";
import {map, switchMap} from "rxjs/internal/operators";
import {combineLatest, of} from "rxjs/index";
import {FuncionarioService} from "../../../../../../infraestructure/services/funcionarios/funcionario.service";
import {FuncionarioSandbox} from "../../../../../../infraestructure/redux_store/states/funcionario/funcionario-sandbox";
import {DependenciesSandbox} from "../../../../../../infraestructure/redux_store/states/dependencies/dependencies-sandbox";

@Component({
  selector: 'app-dependencies',
  templateUrl: './dependencies.component.html',
  styleUrls: ['./dependencies.component.scss']
})
export class DependenciesComponent implements OnInit {

  selectedDependencies$: Observable<DependenciaDTO[]> ;

  dependencies$: Observable<DependenciaDTO[]>;

  subscriptions:Subscription[] = [];

  @Output() dependenciasChange: EventEmitter<any> = new EventEmitter<any>();

  @Output() onBeforeSave: EventEmitter<any> = new EventEmitter();
  @Output() onAfterSave: EventEmitter<any> = new EventEmitter();

  @Input() showButtonSave = true;

  constructor(
    private _depSandbox:DependenciesSandbox,
    private _funcSandbox:FuncionarioSandbox,
    private _funcService:FuncionarioService,
    private _notificationSandbox:NotificationSandbox
  ) {


  }

  loadDependencies(){

    this._depSandbox.load();
  }

  ngOnInit() {

    this.dependencies$ = this._depSandbox.list();

    this.selectedDependencies$ = this._funcSandbox.getDepedenciesForFuncionarioForEdit();

  }

  selectionChange(selection){

    let dispatched = false;

    this.dependenciasChange.emit(selection);

    this._funcSandbox.getFuncionarioForEdit()
      .subscribe(funcionario => {

        if(dispatched)
          return;

        const properties = Object.assign({},funcionario.properties,{dependencias:selection}) ;

        const func =Object.assign({},funcionario,{properties:properties});

        dispatched = true;

        this._funcSandbox.setFuncionarioForEdit(func);
      })
      .unsubscribe();

  }
  saveDependencies(){

    this.onBeforeSave.emit();
   const subscription =  this._funcSandbox.getFuncionarioForEdit()
      .pipe(switchMap(func =>  this._funcService.update(func).pipe(map(() => func))
      ))
      .subscribe((f) => {

        this._notificationSandbox.notify({severity:'success',summary: `Se han actualizado las dependencias del funcionario ${f.name}`});

        this.onAfterSave.emit();

        subscription.unsubscribe();

      });


  }
}

