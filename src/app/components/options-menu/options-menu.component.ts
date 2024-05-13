import { Component, Input } from '@angular/core';
import { MenuOptions } from '../../../shared';

@Component({
  selector: 'app-options-menu',
  templateUrl: './options-menu.component.html',
  styleUrls: ['./options-menu.component.scss']
})
export class OptionsMenuComponent {

  @Input() option! : any
  public listOptions : MenuOptions[] = [
    {label: 'Listado',icon: 'label',url: './client/list', },
    // {label: 'Registrar',icon: 'label',url: './client/register'},
   ]

 

  hideSideNav() {
    this.option.toggle()
  }

}
