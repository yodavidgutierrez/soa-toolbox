import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FuncionarioDTO} from "../../../../shared/domain/funcionarioDTO";
import {Observable} from "rxjs/Rx";
import {FuncionarioSandbox} from "../../../../infraestructure/redux_store/states/funcionario/funcionario-sandbox";
import {DependenciesSandbox} from "../../../../infraestructure/redux_store/states/dependencies/dependencies-sandbox";
import {RolesSandbox} from "../../../../infraestructure/redux_store/states/roles/roles-sandbox";
import {MenuSandbox} from "../../../../infraestructure/redux_store/states/menu/menu.sandbox";

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.scss']
})
export class AdminUserComponent implements OnInit {

  form: FormGroup;

  showProfileDialog = false;

  showRolesDialog = false;

  funcionarios$: Observable<FuncionarioDTO[]>;

  constructor( private _formBuilder: FormBuilder,
               private funcionarioSandbox: FuncionarioSandbox,
               private dependencieSandbox: DependenciesSandbox,
               private rolesSandbox:RolesSandbox
               ) {

    this.initForm();
  }

  ngOnInit() {

    this.funcionarios$ = this.funcionarioSandbox.getFuncionarios();

    this.funcionarioSandbox.loadFuncionarios();

  }

  initForm(){
    this.form = this._formBuilder.group({
      'nombre': [null,Validators.minLength(3)],
      'primerApellido': [null, Validators.minLength(3)],
      'segundoApellido': [null, Validators.minLength(3)],

    });
  }

  searchFuncionarios(){

    this.funcionarioSandbox.loadFuncionarios(this.form.value);
  }

  showProfile(funcionario: FuncionarioDTO){

    this.dependencieSandbox.load();
    this.funcionarioSandbox.setFuncionarioForEdit(funcionario);
     this.showProfileDialog = true;
  }

  hideProfileDialog(){

    this.funcionarioSandbox.reset();
    this.showProfileDialog = false;

  }

  showRoles(funcionario: FuncionarioDTO){

    this.funcionarioSandbox.setFuncionarioForEdit(funcionario);
    this.showRolesDialog = true;

  }

  hideRolesDialog(){
    this.funcionarioSandbox.reset();
  }






}
