import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OptionsMenuComponent } from './options-menu/options-menu.component';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';
import { CustomLoadingComponent } from './custom-loading/custom-loading.component';
import { DialogResponseComponent } from './dialog-response/dialog-response.component';



@NgModule({
  declarations: [
    OptionsMenuComponent,
    CustomLoadingComponent,
    DialogResponseComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    
  ],
  exports: [
    OptionsMenuComponent,
    CustomLoadingComponent,
    DialogResponseComponent
  ]
})
export class ComponentsModule { }
