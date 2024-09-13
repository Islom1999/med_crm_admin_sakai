import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { BaseApiService } from 'src/app/base';
import { environment } from 'src/environments/environment';
import { IAppointment, IAppointService, PaymentDto } from 'src/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService extends BaseApiService<IAppointment> {
  constructor(http: HttpClient){
    super(http, `${environment.apiUrl}/appointment`);
  }

  getAllAppointService(patient_id: string){
    return this.http.get<IAppointService[]>(`${this.apiUrl}/service/${patient_id}`).pipe(
      tap(() => {
        this.loadAll()
      })
    );
  }

  payment(id:string, data:PaymentDto):any{
    return this.http.post<any>(`${this.apiUrl}/payment/${id}`, data).pipe(
      tap(() => {
        this.loadAll()
      })
    );
  }
}
