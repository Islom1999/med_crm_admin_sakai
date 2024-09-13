import { Component, OnInit } from '@angular/core';
import { PatientHistoryService } from '../../services';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { BaseDetailComponentList } from 'src/app/base';
import { IAppointService, IPatient, IPatientHistory, IServices } from 'src/interfaces';
import { AppointmentService } from 'src/app/modules/appointment/services';
import { PatientService } from 'src/app/modules/patient/services';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-patient-history-detail',
  templateUrl: './patient-history-detail.component.html',
  styleUrl: './patient-history-detail.component.scss'
})
export class PatientHistoryDetailComponent extends BaseDetailComponentList<IPatientHistory> implements OnInit {
  is_public = [{ label:"Public", value:true },{ label:"Private", value:false }]
  patinet: IPatient[] = []
  services: IAppointService[] = []

  constructor(
    private baseSrv: PatientHistoryService,
    private appointmentSrv: AppointmentService,
    private patientService: PatientService,
    private messageService: MessageService,
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef
  ) {
    super(baseSrv, messageService, config, ref)
  }

  override ngOnInit(): void {
    this.patientService.getAll().subscribe(data => {
      this.patinet = data
    })

    // forma elementlari
    this.$form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
      descr: new FormControl('', [Validators.required]),
      is_public: new FormControl('', []),
      patient_id: new FormControl('', []),
      appointment_id: new FormControl('', []),
    });

    this.$id = this.$config.data.id;
    if (this.$id) {
      this.$baseSrv.getById(this.$id).subscribe((data) => {
        if(data.patient_id){
          this.getServices(data.patient_id)
        }
        this.$form.patchValue({
          ...data,
          date: new Date(data.date)
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

  getServices(patient_id: string) {
    if (patient_id) {
      this.appointmentSrv.getAllAppointService(patient_id).subscribe(data => {
        this.services = data; 
      }, error => {
        // console.error('Error fetching services', error);
      });
    }
  }

  override $submit() {
    if (this.$form.valid) {
      this.$disableBtn = true;
      const data = this.$form.value
      data.date = new Date(data.date)
      
      if(!data.is_public){
        delete data.is_public
      }
      if(!data.appointment_id){
        delete data.appointment_id
      }

      if (this.$id) {
        this.$update(this.$id, {...data});
      } else {
        this.$create({...data});
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
}
