import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseApiService } from 'src/app/base';
import { environment } from 'src/environments/environment';
import { INews } from 'src/interfaces';

@Injectable({
  providedIn: 'root'
})
export class NewsService extends BaseApiService<INews> {
  constructor(http: HttpClient){
    super(http, `${environment.apiUrl}/news`);
  }
}
