import { Component } from '@angular/core';
import { IServices } from 'src/interfaces';
import { ServicesService } from '../../services';
import { NgxPermissionsService } from 'ngx-permissions';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { PermissionService } from 'src/app/shared';
import { BaseComponentList } from 'src/app/base';
import { ServicesDetailComponent } from '../services-detail/services-detail.component';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-services-list',
  templateUrl: './services-list.component.html',
  styleUrl: './services-list.component.scss',
  providers: [DialogService, CurrencyPipe]
})
export class ServicesListComponent extends BaseComponentList<IServices> {
  constructor(
    baseSrv: ServicesService,
    permission: PermissionService,
    permissionSrv: NgxPermissionsService,
    messageService: MessageService,
    dialogService: DialogService
  ) {
    super(baseSrv, permission, permissionSrv, messageService, dialogService);
  }

  showUpdateModal(id?:string) {
    this.$ref = this.$dialogService.open(ServicesDetailComponent, {
      header: id ? "Xizmatni o'zgartirish" : "Xizmat qo'shish",
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
