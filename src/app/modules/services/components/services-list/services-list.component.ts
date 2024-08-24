import { Component, OnInit } from '@angular/core';
import { IPriceList, IServices } from 'src/interfaces';
import { ServicesService } from '../../services';
import { NgxPermissionsService } from 'ngx-permissions';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { PermissionService } from 'src/app/shared';
import { BaseComponentList } from 'src/app/base';
import { ServicesDetailComponent } from '../services-detail/services-detail.component';
import { CurrencyPipe } from '@angular/common';
import { ServiceType, ServiceTypeData } from 'src/enumerations';

@Component({
  selector: 'app-services-list',
  templateUrl: './services-list.component.html',
  styleUrl: './services-list.component.scss',
  providers: [DialogService, CurrencyPipe]
})
export class ServicesListComponent extends BaseComponentList<IServices> implements OnInit {
  type = Object.entries(ServiceTypeData).map(([value, label]) => ({ label, value }));
  serviceTypeData = ServiceTypeData
  
  constructor(
    baseSrv: ServicesService,
    permission: PermissionService,
    permissionSrv: NgxPermissionsService,
    messageService: MessageService,
    dialogService: DialogService
  ) {
    super(baseSrv, permission, permissionSrv, messageService, dialogService);
  }

  override ngOnInit(): void {
    this.$params = this.$baseSrv.getParams().set('type', ServiceType.doctor);
    this.$baseSrv.updateParams(this.$params);
    super.ngOnInit()
  }

  showUpdateModal(type:string, id?:string) {
    this.$ref = this.$dialogService.open(ServicesDetailComponent, {
      header: id ? "Xizmatni o'zgartirish" : "Xizmat qo'shish",
      width: '50vw',
      contentStyle: { overflow: 'auto' },
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw'
      },
      data:{id, type}
    });
  }

  getLatestValidPrice(dataItem: IServices): number | null {
    const latestPriceItem = dataItem.price_list
        .filter(item => item.state === 1)
        .sort((a, b) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime())
        .pop();
    
    return latestPriceItem ? latestPriceItem.price : 0;
  }

}
