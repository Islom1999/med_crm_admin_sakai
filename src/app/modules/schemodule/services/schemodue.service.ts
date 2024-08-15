import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseApiService } from 'src/app/base';
import { environment } from 'src/environments/environment';
import { ISchemodule } from 'src/interfaces';

@Injectable({
  providedIn: 'root'
})
export class SchemodueService extends BaseApiService<ISchemodule>{
  constructor(http: HttpClient){
    super(http, `${environment.apiUrl}/schemodule`);
  }
}
