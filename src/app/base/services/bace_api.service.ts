import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { finalize, switchMap, tap } from 'rxjs/operators';
import { IPagination } from '../../../interfaces/pagination';
import { Cacheable } from 'ngx-cacheable';

@Injectable({
  providedIn: 'root',
})
export abstract class BaseApiService<T> {
  private _dataSubject = new BehaviorSubject<T[]>([]);
  private _loadingSubject = new BehaviorSubject<Boolean>(true);
  readonly _data: Observable<T[]> = this._dataSubject.asObservable();
  readonly _loading: Observable<Boolean> = this._loadingSubject.asObservable()

  constructor(protected http: HttpClient, protected apiUrl: string, protected params?:HttpParams) {
    this.loadAll()
  }

  loadAll(params?: HttpParams) {
    this.http.get<T[]>(`${this.apiUrl}`, { params })
      .pipe(
        tap(data => {
          this._dataSubject.next(data);
          this._loadingSubject.next(false);
        })
      )
      .subscribe(); 
  }

  // @Cacheable()
  getAll(params?: HttpParams): Observable<T[]> {
    return this.http.get<T[]>(`${this.apiUrl}`, { params });
  }

  // @Cacheable()
  getAllPanination(params?: HttpParams): Observable<IPagination<T[]>> {
    return this.http.get<IPagination<T[]>>(`${this.apiUrl}/pagination`, {
      params,
    });
  }

  @Cacheable()
  getById(id: string | undefined): Observable<T> {
    if(!id) return of()
    return this.http.get<T>(`${this.apiUrl}/${id}`);
  }

  create(data: T): Observable<T> {
    return this.http.post<T>(`${this.apiUrl}`, data).pipe(
      tap(() => {
        this.loadAll(this.params)
      })
    );
  }

  update(id: string, data: T): Observable<T> {
    return this.http.patch<T>(`${this.apiUrl}/${id}`, data).pipe(
      tap(() => {
        this.loadAll(this.params)
      }),
    );
  }

  delete(id: string): Observable<T> {
    return this.http.delete<T>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        this.loadAll(this.params)
      }),
    );
  }

  repair(id: string): Observable<T> {
    return this.http.post<T>(`${this.apiUrl}/repair/${id}`, {}).pipe(
      tap(() => {
        this.loadAll(this.params)
      }),
    );
  }
}
