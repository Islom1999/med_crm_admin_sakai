import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApiService } from 'src/app/base';
import { environment } from 'src/environments/environment';
import { IPatient, IUserExtraData, IUserExtraImageType } from 'src/interfaces';

@Injectable({
  providedIn: 'root'
})
export class PatientService extends BaseApiService<IPatient> {
  constructor(http: HttpClient){
    super(http, `${environment.apiUrl}/patient`);
  }

  getUserData(series: string, number: number, birth_date: string): Observable<IUserExtraData> {
    return this.http.get<IUserExtraData>(`${environment.apiUrl}/staff/user/data`, {params: {series,number,birth_date}});
  }

  getUserDataImage(pinfl: string, birth_date: string): Observable<IUserExtraImageType> {
    return this.http.get<IUserExtraImageType>(`${environment.apiUrl}/staff/user/data/image`, {params: {pinfl, birth_date}});
  }
}
