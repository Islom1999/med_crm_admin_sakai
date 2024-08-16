import { Component } from '@angular/core';
import { BaseDetailComponentList } from 'src/app/base';
import { ISchemodule, IStaff } from 'src/interfaces';
import { SchemodueService } from '../../services';
import { SchemoduleType } from 'src/enumerations';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { StaffService } from 'src/app/modules/staff/services';

@Component({
  selector: 'app-schemodue-detail',
  templateUrl: './schemodue-detail.component.html',
  styleUrl: './schemodue-detail.component.scss'
})
export class SchemodueDetailComponent extends BaseDetailComponentList<ISchemodule> {
  type: any[] = Object.values(SchemoduleType);
  staff!: IStaff[]

  weeks = [
    {name: "dushanba", value: 1},
    {name: "seshanba", value: 2},
    {name: "chorshanba", value: 3},
    {name: "payshanba", value: 4},
    {name: "juma", value: 5},
    {name: "shanba", value: 6},
    {name: "yakshanba", value: 7},
  ]

  constructor(
    private baseSrv: SchemodueService,
    private staffSrv: StaffService,
    private messageService: MessageService,
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef
  ) {
    super(baseSrv, messageService, config, ref)
  }

  override ngOnInit(): void {
    this.staffSrv.getAll().subscribe((staff) => {
      this.staff = staff
    })

    // forma elementlari
    this.$form = new FormGroup({
      notes: new FormControl('', []),
      schemodule_type: new FormControl('', [Validators.required]),
      day_of_week: new FormControl('', [Validators.required]),
      start_time: new FormControl(new Date(), [Validators.required]),
      end_time: new FormControl(new Date(), [Validators.required]),
      staff_id: new FormControl('', [Validators.required]),
    });

    this.$id = this.$config.data.id;
    if (this.$id) {
      this.$baseSrv.getById(this.$id).subscribe((data) => {
        if (data.start_time) {
          data.start_time = new Date(data.start_time);
        }
        if (data.end_time) {
          data.end_time = new Date(data.end_time);
        }
        this.$form.patchValue(data);
        this.$disableBtn = false;
        this.$loading = false;
      });
    } else {
      this.$loading = false;
      this.$disableBtn = false;
    }
  }
}
