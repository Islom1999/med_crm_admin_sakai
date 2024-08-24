import { Component } from '@angular/core';
import { FilesService } from '../../services';
import { NgxPermissionsService } from 'ngx-permissions';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import { Table } from 'primeng/table';
import { Observable, catchError, of } from 'rxjs';
import { PermissionService } from 'src/app/shared';
import { IFiles } from 'src/interfaces';
import { environment } from 'src/environments/environment';
import { FilesDetailComponent } from '../files-detail/files-detail.component';
import { FilesInfoComponent } from '../files-info/files-info.component';

@Component({
  selector: 'app-files-list',
  templateUrl: './files-list.component.html',
  styleUrl: './files-list.component.scss',
  providers: [DialogService, ConfirmationService]
})
export class FilesListComponent {
  loading: Observable<Boolean> = this.baseSrv._loading.pipe()
  data: Observable<IFiles[]> = this.baseSrv._data.pipe()
  ref: DynamicDialogRef | undefined;

  constructor(
    protected baseSrv: FilesService,
    protected permission: PermissionService,
    protected permissionSrv: NgxPermissionsService,
    protected messageService: MessageService,
    protected dialogService: DialogService,
  ) {}

  ngOnInit() {
    // this.permission.getPermisssion().subscribe(permission => {
    //   this.permissionSrv.loadPermissions(permission);
    // })
  }

  showUpdateModal(id?:string) {
    this.ref = this.dialogService.open(FilesDetailComponent, {
      header: id ? "Faylni o'zgartirish" : "Fayl qo'shish",
      width: '50vw',
      contentStyle: { overflow: 'auto' },
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw'
      },
      data:{id}
    });
  }

  showInfoModal(id:string) {
    this.ref = this.dialogService.open(FilesInfoComponent, {
      header: "Faylni malumotlari",
      width: '50vw',
      contentStyle: { overflow: 'auto' },
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw'
      },
      data:{id}
    });
  }


  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  getView(id: string) {
    return `${environment.apiUrl}/files/view/${id}`
  }

  delete(id: string | undefined): void {
    if (!id) return
    this.baseSrv.delete(id)
      .pipe(
        catchError(({ error }) => {
          this.messageService.add({ severity: 'error', summary: `Error {error.code}`, detail: `Eror message: {error.message}` })
          return of();
        })
      )
      .subscribe((data) => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Data deleted' })
      })
  }

  deleteAllState(): void {
    this.baseSrv.deleteForceByState()
      .pipe(
        catchError(({ error }) => {
          this.messageService.add({ severity: 'error', summary: `Error {error.code}`, detail: `Eror message: {error.message}` })
          return of();
        })
      )
      .subscribe((data) => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Data deleted' })
      })
  }

  repair(id: string | undefined): void {
    if (!id) return
    this.baseSrv.repair(id)
      .pipe(
        catchError(({ error }) => {
          this.messageService.add({ severity: 'error', summary: `Error {error.code}`, detail: `Eror message: {error.message}` })
          return of();
        })
      )
      .subscribe((data) => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Data repair' })
      })
  }
}
