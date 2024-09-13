import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseApiService } from 'src/app/base';
import { environment } from 'src/environments/environment';
import { IPatientHistory } from 'src/interfaces';

@Injectable({
  providedIn: 'root'
})
export class PatientHistoryService extends BaseApiService<IPatientHistory> {
  constructor(http: HttpClient){
    super(http, `${environment.apiUrl}/patient-history`);
  }
}
