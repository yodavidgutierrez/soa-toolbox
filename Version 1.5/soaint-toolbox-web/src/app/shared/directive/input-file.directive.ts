import {Directive, Host, Input, OnChanges, OnInit, Optional, Self} from '@angular/core';
import {FileUpload} from 'primeng/components/fileupload/fileupload';
import {ObjectUtils} from 'primeng/components/utils/objectutils';

@Directive({
  selector: 'p-fileUpload[appInputFile]'
})
export class InputFileDirective {
  @Input() thefiles: any[] = [];

  constructor(@Self() @Host() @Optional() public el:FileUpload )  {
     this.el.onSelect.subscribe(event => {
       this.thefiles = Object.values(event.files);
     })
    this.el.onRemove.subscribe( () =>
      this.thefiles = [] )
  }


}
