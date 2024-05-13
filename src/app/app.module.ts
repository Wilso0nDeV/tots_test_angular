import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TOTS_CORE_PROVIDER } from '@tots/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TOTS_AUTH_PROVIDER, TotsAuthConfig, TotsAuthInterceptor } from '@tots/auth';
import { TOTS_CLOUD_STORAGE_PROVIDER } from '@tots/cloud-storage';
import { MatDialogModule } from '@angular/material/dialog';


import {  TotsCoreModule } from '@tots/core';
import { MatMenuModule } from '@angular/material/menu';
import { MonacoEditorModule,NGX_MONACO_EDITOR_CONFIG } from 'ngx-monaco-editor-v2';
import { TotsFormModule } from 'projects/tots/form/src/public-api';
import { TotsFormSidebarPageModule } from 'projects/tots/form-sidebar-page/src/public-api';
import { TotsDateFieldFormModule } from 'projects/tots/date-field-form/src/public-api';
import { TotsUsersSelectorMenuModule } from 'projects/tots/users-selector-menu/src/public-api';
import { TotsDaySelectorMenuModule } from 'projects/tots/day-selector-menu/src/public-api';
import { TotsRangeDateSelectorMenuModule } from 'projects/tots/range-date-selector-menu/src/public-api';
import { TotsQuillMentionFieldFormModule } from 'projects/tots/quill-mention-field-form/src/public-api';
import { TotsMonacoEditorFieldFormModule } from 'projects/tots/monaco-editor-field-form/src/public-api';
import { TotsFormWizardModule } from 'projects/tots/form-wizard/src/public-api';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatDialogModule,

    MatMenuModule,

    MonacoEditorModule.forRoot(),

    TotsCoreModule,
    TotsFormModule,
    TotsFormSidebarPageModule,
    TotsDateFieldFormModule,
    TotsUsersSelectorMenuModule,
    TotsDaySelectorMenuModule,
    TotsRangeDateSelectorMenuModule,
    TotsQuillMentionFieldFormModule,
    TotsMonacoEditorFieldFormModule,
    TotsFormWizardModule
        
  ],
  providers: [

    {
      provide: TOTS_CORE_PROVIDER,
      useValue: {
        baseUrl: 'https://agency-coda.uc.r.appspot.com/',

      }
    },
    {
      provide: TOTS_CLOUD_STORAGE_PROVIDER,
      useValue: {
        bucket: 'codahub-files'
      }
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TotsAuthInterceptor,
      multi: true
    },
    {
      provide: TOTS_AUTH_PROVIDER,
      useValue: {
        signInPath: 'oauth/token',
        changePasswordPath: 'users/me/password',
      } as TotsAuthConfig
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
