import { Component } from '@angular/core';
import { BaseComponentList } from 'src/app/base';
import { IDepartament } from 'src/interfaces/departament';
import { DepartamentService } from '../../services';
import { DepartamentDetailComponent } from '../departament-detail/departament-detail.component';
import { NgxPermissionsService } from 'ngx-permissions';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { PermissionService } from 'src/app/shared';

@Component({
  selector: 'app-departament-list',
  templateUrl: './departament-list.component.html',
  styleUrl: './departament-list.component.scss',
  providers: [DialogService]
})
export class DepartamentListComponent extends BaseComponentList<IDepartament> {
  constructor(
    baseSrv: DepartamentService,
    permission: PermissionService,
    permissionSrv: NgxPermissionsService,
    messageService: MessageService,
    dialogService: DialogService
  ) {
    super(baseSrv, permission, permissionSrv, messageService, dialogService);
  }

  showUpdateModal(id?:string) {
    this.$ref = this.$dialogService.open(DepartamentDetailComponent, {
      header: id ? "Bo'limlar o'zgartirish" : "Bo'lim qo'shish",
      width: '50vw',
      contentStyle: { overflow: 'auto' },
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw'
      },
      data:{id}
    });
  }
}
