import { Component, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { TotsListResponse, TotsQuery } from '@tots/core';
import { TotsTableFullGroupComponent } from 'projects/tots/editable-columns/src/public-api';

import { TotsMoreMenuColumn } from 'projects/tots/table/src/lib/column-factories/tots-more-menu-column';

import { TotsStringColumn } from 'projects/tots/table/src/lib/column-factories/tots-string-column';
import { TotsMoreMenuItem } from 'projects/tots/table/src/lib/entities/tots-more-menu-item';
import {
  TotsActionTable,
  TotsTableComponent,
  TotsTableConfig,
} from 'projects/tots/table/src/public-api';
import { TotsModalConfig } from 'projects/tots/form/src/lib/entities/tots-modal-config';

import { delay, of, tap } from 'rxjs';
import { ClientService } from '../../services/client.service';
import { Client } from '../../../../entities/client';
import { MatDialog } from '@angular/material/dialog';
import { DialogResponseComponent } from '../../../../components/dialog-response/dialog-response.component';
import { MessageControlService } from '../../../../../shared/services/message-control.service';
import {
  StringFieldComponent,
  TotsFormModalService,
} from 'projects/tots/form/src/public-api';
import { SubmitButtonFieldComponent } from 'projects/tots/form/src/lib/fields/submit-button-field/submit-button-field.component';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {
  @ViewChild('tableComp') tableComp!: TotsTableComponent;
  @ViewChild('tableCompGroup') tableCompGroup!: TotsTableFullGroupComponent;

  config = new TotsTableConfig();

  private id = 0;

  items: any[] = [];

  formGroup = new FormGroup({});
  dataList = new TotsListResponse();
  constructor(
    protected clientService: ClientService,
    private dialog: MatDialog,
    private messageControlService: MessageControlService,
    protected modalService: TotsFormModalService
  ) {}
  ngOnInit(): void {
    //this.legacyConfig();
    this.configThroughFactories();
    // this.miniConfig();
  }

 
  onTableAction(action: TotsActionTable) {
   
    if (action.key == 'delete') {
      this.removeItem(action.item);
    } else if (action.key == 'edit') {
      this.editItem(action.item);
    } else if (action.key == 'page-change') {
      this.changePage(action.item);
    }
  }

  configThroughFactories() {
    this.config.id = 'table-clients';

    this.config.columns = [
      new TotsStringColumn('firstname', 'firstname', 'Nombre', false  ),
      new TotsStringColumn('lastname', 'lastname', 'Apellido', false  ),
      new TotsStringColumn('email', 'email', 'Email', false ),
      new TotsMoreMenuColumn('more', [
        new TotsMoreMenuItem('edit', 'Editar', 'edit', 'a_css_class'),
        new TotsMoreMenuItem('delete', 'Eliminar', 'delete'),
      ]),
    ];

    const query = new TotsQuery();
    query.page = 1;
    query.per_page = 5;

    this.clientService.list(query).subscribe({
      next: (resp) => {
        const { response } = resp;
        this.dataList.data = response.data;
        this.dataList.total = response.total;
        this.dataList.next_page_url = response.next_page_url;
      },
    });

    this.config.obs = of(this.dataList).pipe(delay(2000));
  }



  removeItem(item: Client) {
    const dialogRef = this.dialog.open(DialogResponseComponent, {
      disableClose: true,
      data: { ...item, message: '¿Desea eliminar al cliente?' },
      width: '250px',
    });

    dialogRef.afterClosed().subscribe((r) => {
      if (r) {
        this.clientService.removeById(item.id).subscribe({
          next: (data) => {
            if (data.success) {
              this.messageControlService.ShowSuccess(
                'Se elimino correctamente'
              );
            } else {
              this.messageControlService.ShowError('Ocurrio un problema');
            }
          },
          complete: () => {
            this.configThroughFactories();
          },
          error: () =>
            this.messageControlService.ShowError('Ocurrio un problema'),
        });
      }
    });
  }

  editItem(item: Client){
    console.log(item)
    let config = new TotsModalConfig();
    config.title = 'Modal de ejemplo';
    config.autoSave = true;
    config.item  = item;
    config.fields = [
      // Campo string

      {
        key: 'firstname',
        component: StringFieldComponent,
        label: 'Nombre',
        validators: [Validators.required],
      },
      {
        key: 'lastname',
        component: StringFieldComponent,
        label: 'Apellidos',
        validators: [Validators.required],
      },
      {
        key: 'email',
        component: StringFieldComponent,
        label: 'Email',
        validators: [Validators.required, Validators.email],
      },
      { key: 'update', component: SubmitButtonFieldComponent, label: 'Enviar' },
    ];
    this.modalService
      .open(config)
      .pipe(
        tap((action) => {
          if (action.key == 'update') {
            action.modal?.componentInstance.showLoading();
        
            this.clientService.update(item).subscribe({
              next: (data) => {
                if (data.success) {
                  this.messageControlService.ShowSuccess(
                    'Se actualizo Correctamente'
                  );
                } else {
                  this.messageControlService.ShowError('Ocurrio un Error');
                }
              },
              complete: () => {
                this.configThroughFactories();
                action.modal?.close();
              },
              error: () => {
                this.messageControlService.ShowError('Ocurrio un Error');
              },
            });
          }
        })
      )
      .pipe(delay(2000))
      .pipe(tap((action) => action.modal?.componentInstance.hideLoading()))
      .subscribe((action) => {});
  }

  onClickOpenModal() {
    let config = new TotsModalConfig();
    config.title = 'Modal de ejemplo';
    config.autoSave = true;
    config.item = [];
    config.fields = [
      // Campo string

      {
        key: 'firstaname',
        component: StringFieldComponent,
        label: 'Nombre',
        validators: [Validators.required],
      },
      {
        key: 'lastname',
        component: StringFieldComponent,
        label: 'Apellidos',
        validators: [Validators.required],
      },
      {
        key: 'email',
        component: StringFieldComponent,
        label: 'Email',
        validators: [Validators.required, Validators.email],
      },
      { key: 'submit', component: SubmitButtonFieldComponent, label: 'Enviar' },
    ];
    this.modalService
      .open(config)
      .pipe(
        tap((action) => {
          if (action.key == 'submit') {
            action.modal?.componentInstance.showLoading();
            const client = new Client();
            const { item } = action;
            client.firstname = item.firstaname;
            client.lastname = item.lastname;
            client.email = item.email;
            this.clientService.create(client).subscribe({
              next: (data) => {
                if (data.success) {
                  this.messageControlService.ShowSuccess(
                    'Se registro Correctamente'
                  );
                } else {
                  this.messageControlService.ShowError('Ocurrio un Error');
                }
              },
              complete: () => {
                this.configThroughFactories();
                action.modal?.close();
              },
              error: () => {
                this.messageControlService.ShowError('Ocurrio un Error');
              },
            });
          }
        })
      )
      .pipe(delay(2000))
      .pipe(tap((action) => action.modal?.componentInstance.hideLoading()))
      .subscribe((action) => {});
  }

  private changePage(pageEvent: PageEvent) {
    const query = new TotsQuery();
    query.page = pageEvent.pageIndex + 1;
    query.per_page = pageEvent.pageSize;

    this.clientService.list(query).subscribe({
      next: (resp) => {
        const { response } = resp;
        this.dataList.data = [...response.data];
      },
    });

    this.config.obs = of(this.dataList).pipe(delay(2000));

    // this.config.obs = of(data).pipe(delay(2000));
    this.tableComp.loadItems();
  }
}
