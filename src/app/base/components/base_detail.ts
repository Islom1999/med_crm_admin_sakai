import { Component, OnInit } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { NgxPermissionsService } from 'ngx-permissions';
import { PermissionService } from '../../shared/services/permission.service';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Table } from 'primeng/table';
import { BaseApiService } from '../services/base_api.service';
import { FormGroup } from '@angular/forms';

@Component({
  template:'',
  providers: [DialogService]
})
export abstract class BaseDetailComponentList<T> {
    $id!:string
    $loading = true;
    $disableBtn = true;
  
    $form: FormGroup = new FormGroup({});
  
    constructor(
      protected $baseSrv: BaseApiService<T>,
      protected $messageService: MessageService,
      protected $config: DynamicDialogConfig,
      protected $ref: DynamicDialogRef
    ) {}

    ngOnInit(): void {
        this.$id = this.$config.data.id;
        if (this.$id) {
          this.$baseSrv.getById(this.$id).subscribe((role) => {
            this.$form.patchValue(role);
            this.$disableBtn = false;
            this.$loading = false;
          });
        } else {
          this.$loading = false;
          this.$disableBtn = false;
        }
    }
  
    $submit() {
      if (this.$form.valid) {
        this.$disableBtn = true;
        if (this.$id) {
          this.$update(this.$id);
        } else {
          this.$create();
        }
      } else {
        Object.values(this.$form.controls).forEach((control) => {
          if (control.invalid) {
            control.markAsDirty();
            control.updateValueAndValidity({ onlySelf: true });
          }
        });
      }
    }
  
    $create() {
      this.$baseSrv
        .create(this.$form.value)
        .pipe(
          catchError(({ error }) => {
            this.$messageService.add({ severity: 'error', summary: `Error ${error.code}`, detail: `Eror message: ${error.message}` })
            this.$disableBtn = false;
            return of();
          })
        )
        .subscribe(() => {
          this.$messageService.add({ severity: 'success', summary: 'Success', detail: 'Data created' })
          this.$ref.close()
        });
    }
  
    $update(id: string) {
      this.$baseSrv
        .update(id, this.$form.value)
        .pipe(
          catchError(({ error }) => {
            this.$messageService.add({ severity: 'error', summary: `Error ${error.code}`, detail: `Eror message: ${error.message}` })
            this.$disableBtn = false;
            return of();
          })
        )
        .subscribe(() => {
          this.$messageService.add({ severity: 'success', summary: 'Success', detail: 'Data updated' })
          this.$ref.close()
        });
    }
  
    $back(){
      this.$ref.close()
    }
}
