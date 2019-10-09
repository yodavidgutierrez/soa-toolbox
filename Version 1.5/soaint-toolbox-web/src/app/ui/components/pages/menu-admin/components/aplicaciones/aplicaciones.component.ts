import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MenuDTO} from '../../../../../../shared/domain/MenuDTO';
import {MenuServices} from '../../../../../../infraestructure/services/menu/menu.services';
import {MenuSandbox} from '../../../../../../infraestructure/redux_store/states/menu/menu.sandbox';
import {isNullOrUndefined} from "util";
import {Subscription} from '../../../../../../../../node_modules/rxjs/Rx';
import {Sandbox as NotificationSandbox} from '../../../../../../infraestructure/redux_store/states/notification/sandbox';
import {FileUpload} from 'primeng/primeng';


@Component({
  selector: 'app-aplicaciones',
  templateUrl: './aplicaciones.component.html',
  styleUrls: ['./aplicaciones.component.scss']
})
export class AplicacionesComponent implements OnInit {

  form: FormGroup;
  menu: MenuDTO;
   logo:string;
  validations: any = {};
  subscriptions: Subscription[] = [];
  @Input() app: MenuDTO;
  @Output() onMenuSave: EventEmitter<MenuDTO> = new EventEmitter<MenuDTO>();

  constructor(private formBuilder :FormBuilder,
              private menuServices :MenuServices,
              private _menuSandbox :MenuSandbox,
              private _notificationSandbox:NotificationSandbox) {
    this.initForm();
  }

  private initForm(){

    this.form = this.formBuilder.group({
      id:[null, ],
      visualizationName:[null, Validators.required],
      Accesslink:[null, Validators.required],
      roles:[null, ],
      defaultApplication:[null, ],
      applicationOrder:[null, (control: AbstractControl)=> {
                    if(isNullOrUndefined(control.value))
      return null;
                   const nomP = parseInt(control.value);
                   return isNaN(nomP)?{'integer':'Requiere numero entero'}: null;
      }]
    })

  }

  ngOnInit() {
    this.subscriptions.push(this._menuSandbox.getMenuForEdit().subscribe( f => {
      this.app = f;
    if(!isNullOrUndefined(this.app)){

      this.form.patchValue({
        visualizationName : this.app.visualizationName,
        Accesslink : this.app.Accesslink,
        defaultApplication: this.app.defaultApplication ||  false,
        applicationOrder: this.app.applicationOrder,


      });

       this.logo = this.app.logo;

    }
    }));
  }



  ngOnDestroy(): void {

    this.subscriptions.forEach(s => s.unsubscribe());
  }



  save(){

    const formValue = this.form.value;


    this.menu = Object.assign({},this.menu,{
      visualizationName: formValue.visualizationName,
      Accesslink: formValue.Accesslink,
      defaultApplication: formValue.defaultApplication,
      applicationOrder: formValue.applicationOrder,
      idApplication: this.app.idApplication,
      logo: this.logo
    });

    this.menuServices.edit(Object.assign(this.menu)).subscribe(() => {

      this._notificationSandbox.notify({severity:'success',summary: `La aplicacion ${this.menu.visualizationName} se ha actualizado correctamente.`});
      this.onMenuSave.emit(this.menu);

    });


  }

  clean(uploader:FileUpload){

    uploader.clear();
    this.logo = null;
  }

  setFiles(event,uploader:FileUpload){

   if(!uploader.validate(event.files[0]))
    return  this._notificationSandbox.notify({severity:'error',summary: `Tamaño del logo no válido, el tamaño máximo es de 10 KB.`});

    const fileReader = new FileReader();
    fileReader.addEventListener('load',ev => {
      this.logo = (<any>ev.target).result;

    }, false );
    fileReader.readAsDataURL(event.files[0]);
  }

  removeFiles(){
    this.logo = null;
  }


}
