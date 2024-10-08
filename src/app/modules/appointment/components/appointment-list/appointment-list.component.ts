import { Component } from '@angular/core';
import { IAppointment, IServices } from 'src/interfaces';
import { AppointmentService } from '../../services';
import { AppointmentDetailComponent } from '../appointment-detail/appointment-detail.component';
import { NgxPermissionsService } from 'ngx-permissions';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { PermissionService } from 'src/app/shared';
import { BaseComponentList } from 'src/app/base';
import { AppointmentStatusData, PaymentProviderData, TransactionStatusData } from 'src/enumerations';
import { AppointmentPaymentComponent } from '../appointment-payment/appointment-payment.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrl: './appointment-list.component.scss',
  providers: [DialogService]
})
export class AppointmentListComponent extends BaseComponentList<IAppointment> {
  appointmentStatusData = AppointmentStatusData
  transactionStatusData = TransactionStatusData
  paymentProviderData = PaymentProviderData
  page_type!:string

  constructor(
    baseSrv: AppointmentService,
    permission: PermissionService,
    permissionSrv: NgxPermissionsService,
    messageService: MessageService,
    dialogService: DialogService,
    private route: ActivatedRoute,
  ) {
    super(baseSrv, permission, permissionSrv, messageService, dialogService);
  }

  override ngOnInit(): void {
    this.page_type = this.route.snapshot.data['page_type'];
    
    super.ngOnInit();
  }

  showUpdateModal(id?:string) {
    this.$ref = this.$dialogService.open(AppointmentDetailComponent, {
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

  showPaymentModal(id?:string) {
    this.$ref = this.$dialogService.open(AppointmentPaymentComponent, {
      header: id ? "To'lov" : "To'lov",
      width: '80vw',
      contentStyle: { overflow: 'auto' },
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw'
      },
      data:{id}
    });
  }

  getLatestValidPrice(dataItem: IServices): number | null {
    const latestPriceItem = dataItem.price_list
        .filter(item => item.state === 1)
        .sort((a, b) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime())
        .pop();
    
    return latestPriceItem ? latestPriceItem.price : 0;
  }

  isPageType(type: string){
    return type == this.page_type
  }
}
