import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  HttpClientModule } from '@angular/common/http';
import { TOTS_TABLE_DEFAULT_CONFIG,  TotsTableModule } from 'projects/tots/table/src/public-api';
import { ClientRoutingModule } from './client-routing.module';
import { ListComponent } from './pages/list/list.component';
import { TotsDateColumnModule } from 'projects/tots/date-column/src/public-api';
import { TotsEditableColumnsModule } from 'projects/tots/editable-columns/src/public-api';
import { totsTableDefaultConfig } from '../../entities/tots-table-default-config';
import { MaterialModule } from '../../material/material.module';
import { TotsFormModule } from 'projects/tots/form/src/public-api';
import { TotsUsersSelectorMenuModule } from 'projects/tots/users-selector-menu/src/public-api';
import { TotsDaySelectorMenuModule } from 'projects/tots/day-selector-menu/src/public-api';
import { TotsRangeDateSelectorMenuModule } from 'projects/tots/range-date-selector-menu/src/public-api';
import { RegisterComponent } from './pages/register/register.component';


@NgModule({
  declarations: [
    ListComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    MaterialModule,


    TotsTableModule,
    TotsEditableColumnsModule,
    TotsDateColumnModule,
    // //Form

     TotsFormModule,
     TotsUsersSelectorMenuModule,
     TotsDaySelectorMenuModule,
     TotsRangeDateSelectorMenuModule,
     HttpClientModule,
  ],
  providers: [
    
    {
      provide: TOTS_TABLE_DEFAULT_CONFIG,
      useValue: totsTableDefaultConfig
    }
  ]
})
export class ClientModule { }
