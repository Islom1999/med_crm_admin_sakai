import { Component, OnInit } from '@angular/core';
import { IRole } from 'src/interfaces/role';
import { RoleService } from '../../services';
import { NgxPermissionsService } from 'ngx-permissions';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { RoleDetailComponent } from '../role-detail/role-detail.component';
import { BaseComponentList } from 'src/app/base';
import { PermissionService } from 'src/app/shared';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrl: './role-list.component.scss',
  providers: [DialogService]
})
export class RoleListComponent extends BaseComponentList<IRole> implements OnInit {
  constructor(
    baseSrv: RoleService,
    permission: PermissionService,
    permissionSrv: NgxPermissionsService,
    messageService: MessageService,
    dialogService: DialogService
  ) {
    super(baseSrv, permission, permissionSrv, messageService, dialogService);
  }

  showUpdateModal(id?:string) {
    this.$ref = this.$dialogService.open(RoleDetailComponent, {
      header: id ? "Lavozimmi o'zgartirish" : "Lavozim qo'shish",
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
