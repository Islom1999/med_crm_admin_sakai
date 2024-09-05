import { Component } from '@angular/core';
import { BaseDetailComponentList } from 'src/app/base';
import { AppointmentStatusData } from 'src/enumerations';
import { IAppointment, IPatient, IServices } from 'src/interfaces';
import { AppointmentService } from '../../services';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ServicesService } from 'src/app/modules/services/services';
import { PatientService } from 'src/app/modules/patient/services';

@Component({
  selector: 'app-appointment-detail',
  templateUrl: './appointment-detail.component.html',
  styleUrl: './appointment-detail.component.scss'
})
export class AppointmentDetailComponent extends BaseDetailComponentList<IAppointment> {
  appointmentStatusData = Object.entries(AppointmentStatusData).map(([value, label]) => ({ label, value }));
  services: IServices[] = []
  patinet: IPatient[] = []
  totalPrice: number = 0;
  totalDiscount: number = 0;


  constructor(
    private baseSrv: AppointmentService,
    private serviceSrv: ServicesService,
    private patientSrv: PatientService,
    private messageService: MessageService,
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef
  ) {
    super(baseSrv, messageService, config, ref)
  }

  override ngOnInit(): void {
    this.serviceSrv.getAll().subscribe(data => {
      this.services = data
    })
    this.patientSrv.getAll().subscribe(data => {
      this.patinet = data
    })

    // forma elementlari
    this.$form = new FormGroup({
      date: new FormControl(new Date(), [Validators.required]),
      status: new FormControl('', [Validators.required]),
      discount: new FormControl(0, [Validators.required]),
      patient_id: new FormControl('', []),
      service_id: new FormControl([], []),
    });

    this.$id = this.$config.data.id;
    if (this.$id) {
      this.$baseSrv.getById(this.$id).subscribe((data) => {
        const service_id = data.services.map(service => service.service_id)
        this.totalDiscount = data.discount
        this.totalPrice = data.price / (1 - data.discount/100)

        this.$form.patchValue({
          ...data,
          date: new Date(data.date),
          service_id
        });

        this.$disableBtn = false;
        this.$loading = false;
      });
    } else {
      this.$loading = false;
      this.$disableBtn = false;
    }

    // id ga qarab update yoki create ni aniqlaydi parentda
    // super.ngOnInit()
  }


  calculateTotalPrice(selectedServiceIds: string[]): void {
    this.totalPrice = selectedServiceIds.reduce((sum, serviceId) => {
      const selectedService = this.services.find(service => service.id === serviceId);
      return sum + (selectedService?.price_list[0].price || 0);
    }, 0);
  }
  calculateTotalDiscount(value:number){
    this.totalDiscount = Number(value);
  }
}
