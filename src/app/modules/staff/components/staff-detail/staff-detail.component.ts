import { ChangeDetectorRef, Component } from '@angular/core';
import { BaseDetailComponentList } from 'src/app/base';
import { IDepartament, IRole, IStaff } from 'src/interfaces';
import { StaffService } from '../../services';
import { Gender, StaffType } from 'src/enumerations';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { RoleService } from 'src/app/modules/role/services';
import { DepartamentService } from 'src/app/modules/departament/services';
import { catchError, of } from 'rxjs';


interface UploadEvent {
  originalEvent: Event;
  files: File[];
}

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
  imageSrc: string | null = 'assets/layout/images/avatar.jpg';
  is_disable=false

  type_check = [{label: "Passport ma'lumotlar", value: true},{label: "Qo'lda kiritish", value: false}]
  
  constructor(
    private baseSrv: StaffService,
    private roleSrv: RoleService,
    private departamentSrv: DepartamentService,
    private messageService: MessageService,
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef,
    private prime_config: PrimeNGConfig,
    private cdr: ChangeDetectorRef
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

  setPerson() {
    try {
      const seriesDocument = this.$form.get('series_document')?.value;
      const dateOfBirthControl = this.$form.get('date_of_birth');

      if (seriesDocument && dateOfBirthControl && dateOfBirthControl.value) {
        // Maskadagi qiymatni katta harflarga o'tkazish
        const cleanedSeriesDocument = seriesDocument.replace(/[()\s]/g, '').toUpperCase();

        const series = cleanedSeriesDocument.substring(0, 2); // Birinchi ikki harf (AB)
        const number = parseInt(cleanedSeriesDocument.substring(2)); // Qolgan raqamlar (4774828)

        const dateOfBirth = dateOfBirthControl.value;

        if(!this.is_disable) return

        let formattedDateOfBirth;
        if (typeof dateOfBirth === 'string') {
          const [day, month, year] = dateOfBirth.split('.');
          formattedDateOfBirth = `${year}-${month}-${day}`; // YYYY-MM-DD formatiga o'tkazish
        } else if (dateOfBirth instanceof Date) {
          // formattedDateOfBirth = dateOfBirth.toISOString().split('T')[0]; // YYYY-MM-DD formatiga o'tkazish
          formattedDateOfBirth = dateOfBirth.getFullYear() + '-' +
            String(dateOfBirth.getMonth() + 1).padStart(2, '0') + '-' +
            String(dateOfBirth.getDate()).padStart(2, '0');
        }

        if (formattedDateOfBirth) {
          try {
            this.baseSrv.getUserData(series, number, formattedDateOfBirth)
              .pipe(
                catchError(({ error }) => {
                  this.$form.patchValue({
                    fullname: '',
                    address: '',
                    nationality: '',
                    pinfl: '',
                  })
                  return of();
                })
              )
              .subscribe(userData => {
                this.$form.patchValue({
                  fullname: userData.fullname,
                  address: userData.address,
                  nationality: userData.nationality,
                  pinfl: userData.pinfl.toString(),
                  gender: userData.gender,
                })
                this.baseSrv.getUserDataImage(userData.pinfl.toString(), formattedDateOfBirth).subscribe((data) => {
                  this.imageSrc = `data:${data.contentType};base64,${data.photo}`;
                })
              });
          } catch (error) {

          }
        }
      } else {
        // console.log('Sana yoki passport seriasi to\'ldirilmagan.');
      }
      this.cdr.detectChanges()
    } catch (error) {

    }
  }

  override $submit(): void {
    if (this.$form.valid) {
      let phone = this.$form.get('phone')?.value;

      if (phone) {
        const data = this.$form.value
        phone = phone.replace(/[()\s-]/g, '');
        data.phone = parseInt(phone, 10)

        this.$disableBtn = true;
        if (this.$id) {
          this.$update(this.$id, data);
        } else {
          this.$create(data);
        }
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


  // File Upload
  onBasicUploadAuto(event: UploadEvent) {
    // this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded with Auto Mode' });
  }

  changeTypeCheck(value:boolean){
    this.is_disable = value
    this.cdr.detectChanges()
  }
}
