import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseApiService } from 'src/app/base';
import { environment } from 'src/environments/environment';
import { IRoom } from 'src/interfaces';

@Injectable({
  providedIn: 'root'
})
export class RoomsService extends BaseApiService<IRoom> {
  constructor(http: HttpClient){
    super(http, `${environment.apiUrl}/room`);
  }
}
