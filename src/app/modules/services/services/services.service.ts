import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseApiService } from 'src/app/base';
import { ServiceType } from 'src/enumerations';
import { environment } from 'src/environments/environment';
import { IServices } from 'src/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ServicesService extends BaseApiService<IServices> {
  constructor(http: HttpClient){
    super(http, `${environment.apiUrl}/service`);
  }
}
