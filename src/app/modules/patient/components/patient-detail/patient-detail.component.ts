import { ChangeDetectorRef, Component } from '@angular/core';
import { BaseDetailComponentList } from 'src/app/base';
import { IPatient } from 'src/interfaces';
import { PatientService } from '../../services';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { catchError, of } from 'rxjs';
import { StaffType, Gender } from 'src/enumerations';

@Component({
  selector: 'app-patient-detail',
  templateUrl: './patient-detail.component.html',
  styleUrl: './patient-detail.component.scss'
})
export class PatientDetailComponent extends BaseDetailComponentList<IPatient> {
  type: any[] = Object.values(StaffType);
  gender: any[] = Object.values(Gender);
  imageSrc: string | null = 'assets/layout/images/avatar.jpg';

  constructor(
    private baseSrv: PatientService,
    private messageService: MessageService,
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef,
  ) {
    super(baseSrv, messageService, config, ref)
  }

  override ngOnInit(): void {
    // forma elementlari
    this.$form = new FormGroup({
      fullname: new FormControl('', [Validators.required]),
      gender: new FormControl('', []),
      pinfl: new FormControl('', []),
      series_document: new FormControl('', []),
      nationality: new FormControl('', []),
      phone: new FormControl('', [Validators.required]),
      email: new FormControl('', []),
      address: new FormControl('', []),
      date_of_birth: new FormControl('', []),
      // bio: new FormControl('', []),
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
                  pinfl: userData.pinfl,
                  gender: userData.gender,
                })
                this.$form.get('series_document')?.disable();
                this.$form.get('date_of_birth')?.disable();
                this.$form.get('pinfl')?.disable();
                // this.$form.get('gender')?.disable();
  
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
    } catch (error) {
      
    }
  }

  override $submit(): void {
    if (this.$form.valid) {
      let phone = this.$form.get('phone')?.value;
      let date_of_birth = this.$form.get('date_of_birth')?.value;
      
      if (phone) {
        const data = this.$form.value
        phone = phone.replace(/[()\s-]/g, '');
        data.phone = parseInt(phone, 10)
        data.date_of_birth = new Date(date_of_birth)
        data.gender = data.gender as Gender

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
}
