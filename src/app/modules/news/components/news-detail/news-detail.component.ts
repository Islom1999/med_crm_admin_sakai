import { Component } from '@angular/core';
import { BaseDetailComponentList } from 'src/app/base';
import { IFiles, INews } from 'src/interfaces';
import { NewsService } from '../../services';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FilesService } from 'src/app/modules/files/services';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrl: './news-detail.component.scss'
})
export class NewsDetailComponent extends BaseDetailComponentList<INews> {
  is_public = [{ label:"Public", value:true },{ label:"Private", value:false }]
  imageSrc: string | null = 'assets/layout/images/no-image.jpg';
  uploadedFile!:{id:string};
  is_uploaded = false;

  constructor(
    private baseSrv: NewsService,
    private filesService: FilesService,
    private messageService: MessageService,
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef
  ) {
    super(baseSrv, messageService, config, ref)
  }

  override ngOnInit(): void {
    // forma elementlari
    this.$form = new FormGroup({
      title: new FormControl('', [Validators.required]),
      is_public: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
      descr: new FormControl('', []),
    });

    this.$id = this.$config.data.id;
    if (this.$id) {
      this.$baseSrv.getById(this.$id).subscribe((data) => {
        this.$form.patchValue({
          ...data,
          date: new Date(data.date)
        });
        if(data.image){
          this.imageSrc = this.filesService.getView(data.image)
          this.uploadedFile = {id: data?.image}
        }
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

  override $submit() {
    if (this.$form.valid) {
      this.$disableBtn = true;
      const data = this.$form.value
      data.image = this.uploadedFile?.id
      data.date = new Date(data.date)

      if (this.$id) {
        this.$update(this.$id, {...data});
      } else {
        this.$create({...data});
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
