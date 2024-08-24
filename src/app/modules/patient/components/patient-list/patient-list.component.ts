import { Component } from '@angular/core';
import { BaseComponentList } from 'src/app/base';
import { IPatient } from 'src/interfaces';
import { PatientService } from '../../services';
import { PatientDetailComponent } from '../patient-detail/patient-detail.component';
import { NgxPermissionsService } from 'ngx-permissions';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { PermissionService } from 'src/app/shared';
import { GenderData } from 'src/enumerations';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrl: './patient-list.component.scss',
  providers: [DialogService]
})
export class PatientListComponent extends BaseComponentList<IPatient> {
  genderData = GenderData
  
  constructor(
    baseSrv: PatientService,
    permission: PermissionService,
    permissionSrv: NgxPermissionsService,
    messageService: MessageService,
    dialogService: DialogService
  ) {
    super(baseSrv, permission, permissionSrv, messageService, dialogService);
  }

  showUpdateModal(id?:string) {
    this.$ref = this.$dialogService.open(PatientDetailComponent, {
      header: id ? "Bemorlar o'zgartirish" : "Bemorlar qo'shish",
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
