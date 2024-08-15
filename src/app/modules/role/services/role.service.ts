import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseApiService } from 'src/app/base';
import { environment } from 'src/environments/environment';
import { IRole } from 'src/interfaces/role';

@Injectable({
  providedIn: 'root'
})
export class RoleService extends BaseApiService<IRole> {
  constructor(http: HttpClient){
    super(http, `${environment.apiUrl}/role-admin`);
  }
}
