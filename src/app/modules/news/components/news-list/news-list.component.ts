import { Component } from '@angular/core';
import { BaseComponentList } from 'src/app/base';
import { INews } from 'src/interfaces';
import { NewsService } from '../../services';
import { NewsDetailComponent } from '../news-detail/news-detail.component';
import { NgxPermissionsService } from 'ngx-permissions';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { PermissionService } from 'src/app/shared';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrl: './news-list.component.scss',
  providers: [DialogService]
})
export class NewsListComponent extends BaseComponentList<INews> {
  constructor(
    baseSrv: NewsService,
    permission: PermissionService,
    permissionSrv: NgxPermissionsService,
    messageService: MessageService,
    dialogService: DialogService
  ) {
    super(baseSrv, permission, permissionSrv, messageService, dialogService);
  }

  showUpdateModal(id?:string) {
    this.$ref = this.$dialogService.open(NewsDetailComponent, {
      header: id ? "Yangiliklar o'zgartirish" : "Yangiliklar qo'shish",
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
