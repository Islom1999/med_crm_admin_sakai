import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cacheable } from 'ngx-cacheable';
import { BehaviorSubject, catchError, Observable, of, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IFiles, IPagination } from 'src/interfaces';

@Injectable({
  providedIn: 'root'
})
export class FilesService {
  apiUrl = `${environment.apiUrl}/files`
  params!: HttpParams

  private _dataSubject = new BehaviorSubject<IFiles[]>([]);
  private _loadingSubject = new BehaviorSubject<Boolean>(true);
  readonly _data: Observable<IFiles[]> = this._dataSubject.asObservable();
  readonly _loading: Observable<Boolean> = this._loadingSubject.asObservable()

  constructor(
    private http: HttpClient
  ){
    this.loadAll()
  }

  getView(id: string) {
    return `${environment.apiUrl}/files/view/${id}`
  }

  loadAll(params?: HttpParams) {
    this.http.get<IFiles[]>(`${this.apiUrl}`, { params })
      .pipe(
        tap(data => {
          this._dataSubject.next(data);
          this._loadingSubject.next(false);
        })
      )
      .subscribe(); 
  }

  getAll(params?: HttpParams): Observable<IFiles[]> {
    return this.http.get<IFiles[]>(`${this.apiUrl}`, { params });
  }

  getAllPanination(params?: HttpParams): Observable<IPagination<IFiles[]>> {
    return this.http.get<IPagination<IFiles[]>>(`${this.apiUrl}/pagination`, {
      params,
    });
  }

  getById(id: string | undefined): Observable<IFiles> {
    if(!id) return of()
    return this.http.get<IFiles>(`${this.apiUrl}/${id}`);
  }

  getByIdView(id: string | undefined): Observable<IFiles> {
    if(!id) return of()
    return this.http.get<IFiles>(`${this.apiUrl}/view/${id}`);
  }

  delete(id: string): Observable<IFiles> {
    return this.http.delete<IFiles>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        this.loadAll(this.params)
      }),
    );
  }

  deleteForce(id: string): Observable<IFiles> {
    return this.http.delete<IFiles>(`${this.apiUrl}/force/${id}`).pipe(
      tap(() => {
        this.loadAll(this.params)
      }),
    );
  }

  deleteForceByState(): Observable<IFiles> {
    return this.http.delete<IFiles>(`${this.apiUrl}/force/all`).pipe(
      tap(() => {
        this.loadAll(this.params)
      }),
    );
  }

  repair(id: string): Observable<IFiles> {
    return this.http.post<IFiles>(`${this.apiUrl}/repair/${id}`, {}).pipe(
      tap(() => {
        this.loadAll(this.params)
      }),
    );
  }


  // FILE UPLOAD
  uploadImage(file: File): Observable<IFiles> {
    return this.uploadFile(file, 'image');
  }

  uploadDocument(file: File): Observable<IFiles> {
    return this.uploadFile(file, 'document');
  }

  uploadVideo(file: File): Observable<IFiles> {
    return this.uploadFile(file, 'video');
  }

  private uploadFile(file: File, type: 'image' | 'document' | 'video'): Observable<IFiles> {
    const formData = new FormData();
    formData.append('file', file);

    this._loadingSubject.next(true);

    return this.http.post<IFiles>(`${this.apiUrl}/${type}`, formData, {
      headers: new HttpHeaders({
        'enctype': 'multipart/form-data'
      })
    }).pipe(
      tap(response => {
        this.loadAll(this.params)
      }),
      catchError(error => {
        this._loadingSubject.next(false);
        console.error('File upload error:', error);
        return throwError(() => new Error('File upload failed'));
      })
    );
  }
}
