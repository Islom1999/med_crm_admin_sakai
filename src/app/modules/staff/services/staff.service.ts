import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BaseApiService } from 'src/app/base';
import { environment } from 'src/environments/environment';
import { IFiles, IStaff, IUserExtraData, IUserExtraImage, IUserExtraImageType } from 'src/interfaces';

@Injectable({
  providedIn: 'root'
})
export class StaffService extends BaseApiService<IStaff> {
  constructor(http: HttpClient){
    super(http, `${environment.apiUrl}/staff`);
  }

  getUserData(series: string, number: number, birth_date: string): Observable<IUserExtraData> {
    return this.http.get<IUserExtraData>(`${this.apiUrl}/user/data`, {params: {series,number,birth_date}});
  }

  getUserDataImage(pinfl: string, birth_date: string): Observable<IFiles> {
    return this.http.get<IFiles>(`${this.apiUrl}/user/data/image`, {params: {pinfl, birth_date}});
  }
}
