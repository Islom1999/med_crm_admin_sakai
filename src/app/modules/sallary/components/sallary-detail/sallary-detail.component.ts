import { Component } from '@angular/core';
import { SallaryService } from '../../services';
import { SallaryType } from 'src/enumerations';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { StaffService } from 'src/app/modules/staff/services';
import { ISallary, IStaff } from 'src/interfaces';
import { BaseComponentList, BaseDetailComponentList } from 'src/app/base';

@Component({
  selector: 'app-sallary-detail',
  templateUrl: './sallary-detail.component.html',
  styleUrl: './sallary-detail.component.scss'
})
export class SallaryDetailComponent extends BaseDetailComponentList<ISallary>{
  type: any[] = Object.values(SallaryType);
  staff!: IStaff[]

  constructor(
    private baseSrv: SallaryService,
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
      salary_type: new FormControl('', [Validators.required]),
      amount: new FormControl('', [Validators.required]),
      percentage: new FormControl('', [Validators.required]),
      date: new FormControl(new Date(), [Validators.required]),
      staff_id: new FormControl('', [Validators.required]),
    });

    this.$id = this.$config.data.id;
    if (this.$id) {
      this.$baseSrv.getById(this.$id).subscribe((data) => {
        // API'dan kelgan sana matnini Date obyektiga o'tkazish
        if (data.date) {
          data.date = new Date(data.date);
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
