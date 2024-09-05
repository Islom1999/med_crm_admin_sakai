import { Component } from '@angular/core';
import { BaseDetailComponentList } from 'src/app/base';
import { IAppointment, IAppointService, IPatient, IServices } from 'src/interfaces';
import { AppointmentService } from '../../services';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PatientService } from 'src/app/modules/patient/services';
import { ServicesService } from 'src/app/modules/services/services';
import { AppointmentStatusData, PaymentProviderData, TransactionStatusData } from 'src/enumerations';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-appointment-payment',
  templateUrl: './appointment-payment.component.html',
  styleUrl: './appointment-payment.component.scss'
})
export class AppointmentPaymentComponent extends BaseDetailComponentList<IAppointment> {
  appointmentStatusData = Object.entries(AppointmentStatusData).map(([value, label]) => ({ label, value }));
  transactionStatusData = Object.entries(TransactionStatusData).map(([value, label]) => ({ label, value }));
  paymentProviderData = Object.entries(PaymentProviderData).map(([value, label]) => ({ label, value }));
  services: IServices[] = []
  appointment!: IAppointment
  appointmentServices!: IAppointService[]
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
      date: new FormControl({ value: new Date(), disabled: true }),
      patient_id: new FormControl({ value: "", disabled: true }),
      service_id: new FormControl({ value: [], disabled: true }),
      price: new FormControl({ value: 0, disabled: true }, { updateOn: 'change' }),
      status: new FormControl('', { updateOn: 'change', validators: [Validators.required] }),
      provider: new FormControl('', { updateOn: 'change', validators: [Validators.required] }),
      discount: new FormControl(0, { updateOn: 'change', validators: [Validators.required] }),
    });

    this.$id = this.$config.data.id;
    if (this.$id) {
      this.$baseSrv.getById(this.$id).subscribe((data) => {
        const service_id = data.services.map(service => service.service_id)
        this.totalDiscount = data.discount
        this.totalPrice = data.price / (1 - data.discount/100)

        this.appointment = data
        this.appointmentServices = data.services

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
  }

  override $submit() {
    if (this.$form.valid) {
      this.$disableBtn = true;
      if (this.$id) {
        this.payment(this.$id);
      }
    } else {
      Object.values(this.$form.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  payment(id: string) {
    const {provider, status, discount} = this.$form.value
    
    this.baseSrv
      .payment(id, {provider, status, discount})
      .pipe(
        catchError(({ error }) => {
          this.$messageService.add({ severity: 'error', summary: `Error ${error.code}`, detail: `Eror message: ${error.message}` })
          this.$disableBtn = false;
          return of();
        })
      )
      .subscribe(() => {
        this.$messageService.add({ severity: 'success', summary: 'Success', detail: 'Data updated' })
        this.$ref.close()
      });
  }

  calculateTotalPrice(selectedServiceIds: string[]): void {
    this.totalPrice = selectedServiceIds.reduce((sum, serviceId) => {
      const selectedService = this.services.find(service => service.id === serviceId);
      return sum + (selectedService?.price_list[0].price || 0);
    }, 0);

    // Formdagi `price` maydonini yangilash
    this.updateTotalPriceWithDiscount();
  }

  calculateTotalDiscount(value: number): void {
    this.totalDiscount = Number(value);
    this.updateTotalPriceWithDiscount();
  }

  updateTotalPriceWithDiscount(): void {
    const discountedPrice = this.totalPrice * (1 - this.totalDiscount / 100);
    this.$form.patchValue({ price: discountedPrice });
  }

}
