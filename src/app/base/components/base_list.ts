import { Component, OnInit } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { NgxPermissionsService } from 'ngx-permissions';
import { PermissionService } from '../../shared/services/permission.service';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Table } from 'primeng/table';
import { BaseApiService } from '../services/base_api.service';

@Component({
  template:'',
  providers: [DialogService]
})
export abstract class BaseComponentList<T> implements OnInit {
  $loading = false
  $data: Observable<T[]> = this.$baseSrv._data.pipe()
  $ref: DynamicDialogRef | undefined;

  constructor(
    protected $baseSrv: BaseApiService<T>,
    protected $permission: PermissionService,
    protected $permissionSrv: NgxPermissionsService,
    protected $messageService: MessageService,
    protected $dialogService: DialogService,
  ) {}

  ngOnInit() {
    this.$permission.getPermisssion().subscribe(permission => {
      this.$permissionSrv.loadPermissions(permission);
    })
  }

  $onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  $delete(id: string | undefined): void {
    if (!id) return
    this.$baseSrv.delete(id)
      .pipe(
        catchError(({ error }) => {
          this.$messageService.add({ severity: 'error', summary: `Error ${error.code}`, detail: `Eror message: ${error.message}` })
          return of();
        })
      )
      .subscribe((data) => {
        this.$messageService.add({ severity: 'success', summary: 'Success', detail: 'Data deleted' })
      })
  }

  $repair(id: string | undefined): void {
    if (!id) return
    this.$baseSrv.repair(id)
      .pipe(
        catchError(({ error }) => {
          this.$messageService.add({ severity: 'error', summary: `Error ${error.code}`, detail: `Eror message: ${error.message}` })
          return of();
        })
      )
      .subscribe((data) => {
        this.$messageService.add({ severity: 'success', summary: 'Success', detail: 'Data repair' })
      })
  }
}
