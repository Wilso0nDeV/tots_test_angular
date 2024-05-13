import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { LayoutRoutingModule } from './layout-routing.module';
import { ComponentsModule } from '../../components/components.module';
import { MaterialModule } from '../../material/material.module';



@NgModule({
  declarations: [
    LayoutComponent
  ],
  imports: [
    LayoutRoutingModule,
    ComponentsModule,
    MaterialModule,
    CommonModule
  ]
})
export class LayoutModule { }
