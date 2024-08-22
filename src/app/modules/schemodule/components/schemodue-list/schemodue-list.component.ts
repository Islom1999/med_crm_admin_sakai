import { Component } from '@angular/core';
import { BaseComponentList } from 'src/app/base';
import { ISchemodule } from 'src/interfaces';
import { SchemodueService } from '../../services';
import { SchemodueDetailComponent } from '../schemodue-detail/schemodue-detail.component';
import { NgxPermissionsService } from 'ngx-permissions';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { PermissionService } from 'src/app/shared';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-schemodue-list',
  templateUrl: './schemodue-list.component.html',
  styleUrl: './schemodue-list.component.scss',
  providers: [DialogService]
})
export class SchemodueListComponent extends BaseComponentList<ISchemodule>{
  type?:string

  constructor(
    baseSrv: SchemodueService,
    permission: PermissionService,
    permissionSrv: NgxPermissionsService,
    messageService: MessageService,
    dialogService: DialogService,
    private route: ActivatedRoute
  ) {
    super(baseSrv, permission, permissionSrv, messageService, dialogService);
  }

  override ngOnInit(): void {
    this.type = this.route.snapshot.data['type'];
    this.$params = this.$baseSrv.getParams().set('schemodule_type', this.type);
    this.$baseSrv.updateParams(this.$params);
    super.ngOnInit()
  }
  
  showUpdateModal(select_type:string, id?:string) {
    this.$ref = this.$dialogService.open(SchemodueDetailComponent, {
      header: id ? "Ish vaqtini o'zgartirish" : "Ish vaqti qo'shish",
      width: '50vw',
      contentStyle: { overflow: 'auto' },
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw'
      },
      data:{id, select_type}
    });
  }

  isType(type:string){
    return type == this.type
  }
}
