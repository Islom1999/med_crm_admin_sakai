import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Permission } from 'src/enumerations';
import { RoleService } from '../../services';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { IRole } from 'src/interfaces/role';
import { BaseDetailComponentList } from 'src/app/base';
import { Observable } from 'rxjs';
import { IStaff } from 'src/interfaces';
import { StaffService } from 'src/app/modules/staff/services';

@Component({
  selector: 'app-role-detail',
  templateUrl: './role-detail.component.html',
  styleUrl: './role-detail.component.scss',
  providers:[]
})
export class RoleDetailComponent extends BaseDetailComponentList<IRole> implements OnInit {
  permissionsTypes: any[] = Object.values(Permission);

  constructor(
    private baseSrv: RoleService,
    private messageService: MessageService,
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef
  ) {
    super(baseSrv, messageService, config, ref)
  }

  override ngOnInit(): void {
    // forma elementlari
    this.$form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      permissions: new FormControl('', [Validators.required]),
      descr: new FormControl('', []),
    });

    // id ga qarab update yoki create ni aniqlaydi parentda
    super.ngOnInit()
  }
}
