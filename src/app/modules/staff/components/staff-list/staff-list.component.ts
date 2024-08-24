import { Component } from '@angular/core';
import { BaseComponentList } from 'src/app/base';
import { IStaff } from 'src/interfaces';
import { StaffService } from '../../services';
import { StaffDetailComponent } from '../staff-detail/staff-detail.component';
import { NgxPermissionsService } from 'ngx-permissions';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { PermissionService } from 'src/app/shared';
import { StaffTypeData } from 'src/enumerations';

@Component({
  selector: 'app-staff-list',
  templateUrl: './staff-list.component.html',
  styleUrl: './staff-list.component.scss',
  providers: [DialogService]
})
export class StaffListComponent extends BaseComponentList<IStaff> {
  staffTypeData = StaffTypeData

  constructor(
    baseSrv: StaffService,
    permission: PermissionService,
    permissionSrv: NgxPermissionsService,
    messageService: MessageService,
    dialogService: DialogService
  ) {
    super(baseSrv, permission, permissionSrv, messageService, dialogService);
  }

  showUpdateModal(id?:string) {
    this.$ref = this.$dialogService.open(StaffDetailComponent, {
      header: id ? "Xodimlar o'zgartirish" : "Xodim qo'shish",
      width: '80vw',
      contentStyle: { overflow: 'auto' },
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw'
      },
      data:{id}
    });
  }
}
