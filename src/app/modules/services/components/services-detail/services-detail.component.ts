import { Component } from '@angular/core';
import { BaseDetailComponentList } from 'src/app/base';
import { IFiles, IRoom, IServices, IStaff } from 'src/interfaces';
import { ServicesService } from '../../services';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ServiceType, ServiceTypeData } from 'src/enumerations';
import { StaffService } from 'src/app/modules/staff/services';
import { Observable } from 'rxjs';
import { RoomsService } from 'src/app/modules/rooms/services';
import { HttpParams } from '@angular/common/http';
import { FilesService } from 'src/app/modules/files/services';

@Component({
  selector: 'app-services-detail',
  templateUrl: './services-detail.component.html',
  styleUrl: './services-detail.component.scss'
})
export class ServicesDetailComponent extends BaseDetailComponentList<IServices> {
  type = Object.entries(ServiceTypeData).map(([value, label]) => ({ label, value }));
  is_public = [{ label:"Public", value:true },{ label:"Private", value:false }]
  staff!: IStaff[]
  room!: IRoom[]
  select_type: string
  room_id: string

  imageSrc: string | null = 'assets/layout/images/no-image.jpg';
  uploadedFile!:IFiles;
  is_uploaded = false;

  constructor(
    private baseSrv: ServicesService,
    private staffSrv: StaffService,
    private roomSrv: RoomsService,
    private filesService: FilesService,
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

    let params = new HttpParams()
    params = params.set('type_id', 2)

    this.roomSrv.getAll(params).subscribe((room) => {
      this.room = room
    })

    this.$id = this.$config.data.id;
    this.select_type = this.$config.data.type;
    this.room_id = this.$config.data.room_id;

    // forma elementlari
    this.$form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      descr: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      duration: new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required]),
      is_public: new FormControl('', [Validators.required]),
      staff_id: new FormControl('', [ this.isType('doctor') ? Validators.required : Validators.min(1) ]),
      room_id: new FormControl('', [this.isType('room') ? Validators.required : Validators.min(1)]),
    });

    if (this.$id) {
      this.$baseSrv.getById(this.$id).subscribe((data) => {
        this.$form.patchValue({
          ...data,
          price: this.getLatestValidPrice(data),
          type: this.$config.data.type,
          room_id: this.room_id
        });
        if(data.image){
          this.imageSrc = this.filesService.getView(data.image)
        }
        this.$disableBtn = false;
        this.$loading = false;
      });
    } else {
      this.$form.patchValue({
        type: this.$config.data.type,
        room_id: this.room_id
      });
      this.$loading = false;
      this.$disableBtn = false;
    }

    // this.$form.get('type')?.disable()

    // id ga qarab update yoki create ni aniqlaydi parentda
    // super.ngOnInit()
  }


  override $submit() {
    if (this.$form.valid) {
      this.$disableBtn = true;
      const data = this.$form.value
      data.image = this.uploadedFile?.id

      this.isType('room') ? (delete data.staff_id) : this.isType('doctor') ? (delete data.room_id) : {}

      if (this.$id) {
        this.$update(this.$id, {...data});
        // this.roomSrv.getAll()
      } else {
        this.$create({...data});
        // this.roomSrv.getAll()
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


  getLatestValidPrice(dataItem: IServices): number | null {
    const latestPriceItem = dataItem.price_list
        .filter(item => item.state === 1)
        .sort((a, b) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime())
        .pop();
    
    return latestPriceItem ? latestPriceItem.price : 0;
  }

  isType(type:string){
    return type == this.select_type
  }

  // File Upload
  onUpload(event: any, fileType: 'image', fileInput: any) {
    for (let file of event.files) {
      this.uploadFile(file, fileType, fileInput);
    }
  }

  private uploadFile(file: File, fileType: 'image', fileInput: any) {
    if (fileType === 'image') {
      this.filesService.uploadImage(file).subscribe({
        next: (response) => {
          this.is_uploaded = true
          this.uploadedFile = response
          this.imageSrc = this.filesService.getView(this.uploadedFile.id)
          fileInput.clear();

          this.messageService.add({ severity: 'success', summary: 'Success', detail: `${file.name} yuklandi.` });
        },
        error: (err) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: `Yuklanmadi ${file.name}.` });
        }
      });
    } 
  }

  clearImage(){
    this.is_uploaded = false
    this.uploadedFile = null
    this.imageSrc = 'assets/layout/images/avatar.jpg'
  }
}
