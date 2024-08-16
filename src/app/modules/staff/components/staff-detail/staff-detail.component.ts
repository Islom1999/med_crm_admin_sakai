import { Component } from '@angular/core';
import { BaseDetailComponentList } from 'src/app/base';
import { IDepartament, IRole, IStaff } from 'src/interfaces';
import { StaffService } from '../../services';
import { Gender, StaffType } from 'src/enumerations';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { RoleService } from 'src/app/modules/role/services';
import { DepartamentService } from 'src/app/modules/departament/services';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-staff-detail',
  templateUrl: './staff-detail.component.html',
  styleUrl: './staff-detail.component.scss'
})
export class StaffDetailComponent extends BaseDetailComponentList<IStaff> {
  type: any[] = Object.values(StaffType);
  gender: any[] = Object.values(Gender);
  role!: IRole[]
  department!: IDepartament[]

  constructor(
    private baseSrv: StaffService,
    private roleSrv: RoleService,
    private departamentSrv: DepartamentService,
    private messageService: MessageService,
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef
  ) {
    super(baseSrv, messageService, config, ref)
  }

  override ngOnInit(): void {
    this.departamentSrv.getAll().subscribe(departments => {
      this.department = departments;
    });
    this.roleSrv.getAll().subscribe(roles => {
      this.role = roles;
    });

    // forma elementlari
    this.$form = new FormGroup({
      fullname: new FormControl('', [Validators.required]),
      gender: new FormControl('', []),
      pinfl: new FormControl('', []),
      series_document: new FormControl('', []),
      nationality: new FormControl('', []),
      phone: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      address: new FormControl('', []),
      date_of_birth: new FormControl('', []),
      bio: new FormControl('', []),
      staff_type: new FormControl('', [Validators.required]),
      department_id: new FormControl('', [Validators.required]),
      role_id: new FormControl('', [Validators.required]),
    });

    this.$id = this.$config.data.id;
    if (this.$id) {
      this.$baseSrv.getById(this.$id).subscribe((data) => {
        // API'dan kelgan sana matnini Date obyektiga o'tkazish
        if (data.date_of_birth) {
          data.date_of_birth = new Date(data.date_of_birth);
        }

        this.$form.patchValue(data);

        this.$disableBtn = false;
        this.$loading = false;
      });
    } else {
      this.$loading = false;
      this.$disableBtn = false;
    }

    // id ga qarab update yoki create ni aniqlaydi parentda
    // super.ngOnInit()
  }
}
