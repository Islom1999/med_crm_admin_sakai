import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseApiService } from 'src/app/base';
import { environment } from 'src/environments/environment';
import { IAppointment } from 'src/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService extends BaseApiService<IAppointment> {
  constructor(http: HttpClient){
    super(http, `${environment.apiUrl}/appointment`);
  }
}
