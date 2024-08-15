import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseApiService } from 'src/app/base';
import { environment } from 'src/environments/environment';
import { ISallary } from 'src/interfaces';

@Injectable({
  providedIn: 'root'
})
export class SallaryService extends BaseApiService<ISallary> {
  constructor(http: HttpClient){
    super(http, `${environment.apiUrl}/sallary`);
  }
}
