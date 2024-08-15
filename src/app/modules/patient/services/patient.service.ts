import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseApiService } from 'src/app/base';
import { environment } from 'src/environments/environment';
import { IPatient } from 'src/interfaces';

@Injectable({
  providedIn: 'root'
})
export class PatientService extends BaseApiService<IPatient> {
  constructor(http: HttpClient){
    super(http, `${environment.apiUrl}/patient`);
  }
}
