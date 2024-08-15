import { Component } from '@angular/core';
import { BaseDetailComponentList } from 'src/app/base';
import { IServices, IStaff } from 'src/interfaces';
import { ServicesService } from '../../services';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ServiceType } from 'src/enumerations';
import { StaffService } from 'src/app/modules/staff/services';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-services-detail',
  templateUrl: './services-detail.component.html',
  styleUrl: './services-detail.component.scss'
})
export class ServicesDetailComponent extends BaseDetailComponentList<IServices> {
  type: any[] = Object.values(ServiceType);
  staff!:IStaff[]

  constructor(
    private baseSrv: ServicesService,
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
      name: new FormControl('', [Validators.required]),
      desc : new FormControl('', [Validators.required]),
      amount : new FormControl('', [Validators.required]),
      duration : new FormControl('', [Validators.required]),
      type : new FormControl('', [Validators.required]),
      staff_id : new FormControl('', [Validators.required]),
    });

    // id ga qarab update yoki create ni aniqlaydi parentda
    super.ngOnInit()
  }

  filterCountry(event: any) {
    const filtered: any[] = [];
    const query = event.query;
    for (let i = 0; i < this.staff.length; i++) {
        const staff = this.staff[i];
        if (staff.fullname.toLowerCase().indexOf(query.toLowerCase()) == 0) {
            filtered.push(staff);
        }
    }

    this.staff = filtered;
}
}
