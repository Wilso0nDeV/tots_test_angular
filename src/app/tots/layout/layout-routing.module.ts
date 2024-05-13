import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [{
  path: '',
  component:LayoutComponent,
  children: [

    { path: '', redirectTo: 'client', pathMatch: 'full' },
    {
      path: 'client',
      loadChildren: () =>
        import('src/app/tots/client/client.module').then((m) => m.ClientModule),
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
