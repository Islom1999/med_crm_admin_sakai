import { Component } from '@angular/core';
import { PatientHistoryService } from '../../services';
import { BaseComponentList } from 'src/app/base';
import { IPatientHistory } from 'src/interfaces';
import { PatientHistoryDetailComponent } from '../patient-history-detail/patient-history-detail.component';
import { NgxPermissionsService } from 'ngx-permissions';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { PermissionService } from 'src/app/shared';

@Component({
  selector: 'app-patient-history-list',
  templateUrl: './patient-history-list.component.html',
  styleUrl: './patient-history-list.component.scss',
  providers: [DialogService]
})
export class PatientHistoryListComponent extends BaseComponentList<IPatientHistory> {
  constructor(
    baseSrv: PatientHistoryService,
    permission: PermissionService,
    permissionSrv: NgxPermissionsService,
    messageService: MessageService,
    dialogService: DialogService
  ) {
    super(baseSrv, permission, permissionSrv, messageService, dialogService);
  }

  showUpdateModal(id?:string) {
    this.$ref = this.$dialogService.open(PatientHistoryDetailComponent, {
      header: id ? "Bemorlar tashxisini o'zgartirish" : "Bemorlar tashxisi qo'shish",
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
