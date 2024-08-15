import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseApiService } from 'src/app/base';
import { environment } from 'src/environments/environment';
import { IStaff } from 'src/interfaces';

@Injectable({
  providedIn: 'root'
})
export class StaffService extends BaseApiService<IStaff> {
  constructor(http: HttpClient){
    super(http, `${environment.apiUrl}/staff`);
  }
}
