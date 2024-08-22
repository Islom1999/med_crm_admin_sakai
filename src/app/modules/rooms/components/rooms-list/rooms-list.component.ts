import { Component } from '@angular/core';
import { BaseComponentList } from 'src/app/base';
import { IRoom, IServices } from 'src/interfaces';
import { RoomsService } from '../../services';
import { RoomsDetailComponent } from '../rooms-detail/rooms-detail.component';
import { NgxPermissionsService } from 'ngx-permissions';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { PermissionService } from 'src/app/shared';
import { Table } from 'primeng/table';
import { ServicesDetailComponent } from 'src/app/modules/services/components';

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
      width: '50vw',
      contentStyle: { overflow: 'auto' },
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw'
      },
      data:{id, parent_id, type_id}
    });
  }

  showServiceModal(type:string, room_id?:string, id?:string) {
    
    console.log({type, room_id, id})

    this.$ref = this.$dialogService.open(ServicesDetailComponent, {
      header: id ? "Xizmatni o'zgartirish" : "Xizmat qo'shish",
      width: '50vw',
      contentStyle: { overflow: 'auto' },
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw'
      },
      data:{id, type, room_id}
    });
  }

  override ngOnInit(): void {
    super.ngOnInit()
  }

  getLatestValidService(dataItem: IRoom): IServices | null {
    const latestPriceItem = dataItem.service
        .filter(item => item.state === 1)
        .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
        .pop();
    
    return latestPriceItem ? latestPriceItem : null;
  }

  getLatestValidPrice(dataItem: IRoom): number | null {
    const service = this.getLatestValidService(dataItem)
    const latestPriceItem = service?.price_list
        .filter(item => item.state === 1)
        .sort((a, b) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime())
        .pop();
    
    return latestPriceItem ? latestPriceItem.price : 0;
  }
}
