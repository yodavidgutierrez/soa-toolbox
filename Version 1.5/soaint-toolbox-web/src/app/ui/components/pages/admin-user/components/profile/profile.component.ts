import {
  Component,
  EventEmitter, Input, OnChanges,
  OnDestroy,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {isNullOrUndefined} from "util";
import {VALIDATION_MESSAGES} from "../../../../../../infraestructure/utils/validations.messages";
import {FuncionarioDTO} from "../../../../../../shared/domain/funcionarioDTO";
import {FuncionarioSandbox} from "../../../../../../infraestructure/redux_store/states/funcionario/funcionario-sandbox";
import {FuncionarioService} from "../../../../../../infraestructure/services/funcionarios/funcionario.service";
import {Observable, Subscription} from "rxjs/Rx";
import {ConstanteDTO} from "../../../../../../shared/domain/constanteDTO";
import {ConstantesSandbox} from "../../../../../../infraestructure/redux_store/states/constantes/constantes-sandbox";
import {DependenciesComponent} from "../dependencies/dependencies.component";
import {Sandbox as NotificationSandbox} from '../../../../../../infraestructure/redux_store/states/notification/sandbox';
import {MenuDTO} from '../../../../../../shared/domain/MenuDTO';
import {ActivatedRoute} from '@angular/router';
import {LoginSandbox} from '../../../../../../infraestructure/redux_store/states/authentication/login-sandbox';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit,OnDestroy {

  form: FormGroup;

  funcionario: FuncionarioDTO;

  dep: boolean;

  subscriptions: Subscription[] = [];

  validations: any = {};

  isSaving = false;


   tipoDocumentoId$ : Observable<any[]>;

  @ViewChild('depComponent') depComponent: DependenciesComponent;

  @Output() onProfileSave: EventEmitter<FuncionarioDTO> = new EventEmitter<FuncionarioDTO>();

  constructor(
    private formBuilder:FormBuilder,
    private _funcSandbox:FuncionarioSandbox,
    private _funcService:FuncionarioService,
    private _constanteSandbox:ConstantesSandbox,
    private _notificationSandbox:NotificationSandbox,
    private route: ActivatedRoute,
    private loginsanbox: LoginSandbox,
    ) {
    this.dep = route.snapshot.data.ownProfile;

    if( this.dep ){
      this.loginsanbox.selectProfile().subscribe( res => {

       this._funcService.findbyname(res.username).subscribe(f => this._funcSandbox.setFuncionarioForEdit(f))

     }).unsubscribe();

    }
    this.initForm();
  }


  private initForm(){

       this.form = this.formBuilder.group({
      name:[null,Validators.required],
      email:[null,Validators.compose([Validators.required,Validators.email])],
      valApellido1:[null, Validators.required],
      valApellido2:[null, Validators.required],
      codTipDocIdent:[null],
      nroIdentificacion:[null],
      cargo:[""],
      firmaPolitica:[""],
      esJefe:[false, ]
    })

  }

  listenForBlurEvents(control: string) {

    delete this.validations[control];

    const ac = this.form.get(control);

    const controlKeys = ['name','cargo','firmaPolitica'];

    if(controlKeys.some( key => control == key) && !isNullOrUndefined(ac) && !isNullOrUndefined(ac.value))
      ac.setValue(ac.value.toString().trim());

    if (ac.touched && ac.invalid) {
      const error_keys = Object.keys(ac.errors);


      const last_error_key =  error_keys[error_keys.length - 1];
      this.validations[control] =  VALIDATION_MESSAGES[last_error_key];
    }
  }

  ngOnInit() {

    this._constanteSandbox.load();

    this.tipoDocumentoId$ = this._constanteSandbox.getTiposDocIdent().map(tpds => tpds.map( td => ({
      label:td.nombre,
      value: td.codigo
    })) );

    //this.tipoDocumentoId

    this.subscriptions.push(this._funcSandbox.getFuncionarioForEdit().subscribe( f => {

      if(isNullOrUndefined(f))
         return;


      if(isNullOrUndefined(this.funcionario) || this.funcionario.id !== f.id){

        this.funcionario = f;

        this.form.patchValue({
          name : this.funcionario.name,
          email : this.funcionario.email,
          valApellido1: this.funcionario.properties.valApellido1,
          valApellido2: this.funcionario.properties.valApellido2,
          codTipDocIdent : this.funcionario.properties.codTipoDocIdent,
          nroIdentificacion : this.funcionario.properties.nroIdentificacion,
          cargo:this.funcionario.properties.cargo,
          firmaPolitica:this.funcionario.properties.firmaPolitica,
          esJefe: this.funcionario.properties.esJefe || false
        });
      }

    }));

  }

  showLoading(){

    this.isSaving = true;
  }

  hideLoading(){
    this.isSaving = false;
  }


  save(){

    this.showLoading();

    const formValue = this.form.value;

    const properties = Object.assign({},this.funcionario.properties,
      {
        ideFunci: this.funcionario.id,
        nroIdentificacion: formValue.nroIdentificacion,
        valApellido1: formValue.valApellido1,
        valApellido2: formValue.valApellido2,
        usuarioCrea: "",
        cargo: formValue.cargo,
        firmaPolitica: formValue.firmaPolitica,
        esJefe: formValue.esJefe,
        nomFuncionario: formValue.name,
        codTipoDocIdent : formValue.codTipDocIdent
      },
      );

    this.funcionario = Object.assign({},this.funcionario,{
      name: formValue.name,
      email:formValue.email,
      properties: properties
    });

   this._funcService.update(this.funcionario).subscribe(() => {

     this.hideLoading();

      this.onProfileSave.emit(this.funcionario);
     this._notificationSandbox.notify({severity:'success',summary: `El funcionario ${this.funcionario.name} se ha actualizado correctamente.  `});

    });

  }

  setDependencias(dependencias){

   const properties = Object.assign({},this.funcionario.properties,{dependencias:dependencias}) ;

   this.funcionario =Object.assign({},this.funcionario,{properties:properties});
  }

  ngOnDestroy(): void {

    this.subscriptions.forEach(s => s.unsubscribe());
  }

}
