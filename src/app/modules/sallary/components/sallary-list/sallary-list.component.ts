import { Component } from '@angular/core';
import { BaseComponentList } from 'src/app/base';
import { ISallary } from 'src/interfaces';
import { SallaryService } from '../../services';
import { SallaryDetailComponent } from '../sallary-detail/sallary-detail.component';
import { NgxPermissionsService } from 'ngx-permissions';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { PermissionService } from 'src/app/shared';
import { SallaryTypeData } from 'src/enumerations';

@Component({
  selector: 'app-sallary-list',
  templateUrl: './sallary-list.component.html',
  styleUrl: './sallary-list.component.scss',
  providers: [DialogService]
})
export class SallaryListComponent extends BaseComponentList<ISallary> {
  sallaryTypeData = SallaryTypeData

  constructor(
    baseSrv: SallaryService,
    permission: PermissionService,
    permissionSrv: NgxPermissionsService,
    messageService: MessageService,
    dialogService: DialogService
  ) {
    super(baseSrv, permission, permissionSrv, messageService, dialogService);
  }

  showUpdateModal(id?:string) {
    this.$ref = this.$dialogService.open(SallaryDetailComponent, {
      header: id ? "Ish haqini o'zgartirish" : "Ish haqi qo'shish",
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
