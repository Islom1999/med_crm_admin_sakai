import { Component } from '@angular/core';
import { BaseComponentList } from 'src/app/base';
import { IRoom } from 'src/interfaces';
import { RoomsService } from '../../services';
import { RoomsDetailComponent } from '../rooms-detail/rooms-detail.component';
import { NgxPermissionsService } from 'ngx-permissions';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { PermissionService } from 'src/app/shared';
import { Table } from 'primeng/table';

interface expandedRows {
  [key: string]: boolean;
}

interface Column {
  field: string;
  header: string;
}

@Component({
  selector: 'app-rooms-list',
  templateUrl: './rooms-list.component.html',
  styleUrl: './rooms-list.component.scss',
  providers: [DialogService]
})
export class RoomsListComponent extends BaseComponentList<IRoom> {
  expandedRows: expandedRows = {};
  isExpanded: boolean = false;

  constructor(
    baseSrv: RoomsService,
    permission: PermissionService,
    permissionSrv: NgxPermissionsService,
    messageService: MessageService,
    dialogService: DialogService
  ) {
    super(baseSrv, permission, permissionSrv, messageService, dialogService);
  }

  showUpdateModal(type_id:number, parent_id?:string, id?:string,) {
    this.$ref = this.$dialogService.open(RoomsDetailComponent, {
      header: id ? "Bemorlar o'zgartirish" : "Bemorlar qo'shish",
      width: '80vw',
      contentStyle: { overflow: 'auto' },
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw'
      },
      data:{id, parent_id, type_id}
    });
  }

  override ngOnInit(): void {
    super.ngOnInit()
  }

  // expandAll() {
  //   if (!this.isExpanded) {
  //       this.$data.forEach(item => item && item.name ? this.expandedRows[item.name] = true : '');

  //   } else {
  //       this.expandedRows = {};
  //   }
  //   this.isExpanded = !this.isExpanded;
  // }

  // formatCurrency(value: number) {
  //     return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  // }

  // onGlobalFilter(table: Table, event: Event) {
  //     table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  // }

  // clear(table: Table) {
  //     table.clear();
  //     this.filter.nativeElement.value = '';
  // }
}
