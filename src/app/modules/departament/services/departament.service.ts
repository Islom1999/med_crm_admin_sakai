import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseApiService } from 'src/app/base';
import { environment } from 'src/environments/environment';
import { IDepartament } from 'src/interfaces/departament';

@Injectable({
  providedIn: 'root'
})
export class DepartamentService extends BaseApiService<IDepartament> {
  constructor(http: HttpClient){
    super(http, `${environment.apiUrl}/departament`);
  }
}
