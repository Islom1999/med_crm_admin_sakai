import { Component } from '@angular/core';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { FilesService } from '../../services';
import { IFiles } from 'src/interfaces';

@Component({
  selector: 'app-files-detail',
  templateUrl: './files-detail.component.html',
  styleUrl: './files-detail.component.scss'
})
export class FilesDetailComponent {
  uploadedFiles: any[] = [];

  constructor(private filesService: FilesService, private messageService: MessageService) { }

  onUpload(event: any, fileType: 'image' | 'document' | 'video') {
    for (let file of event.files) {
      this.uploadFile(file, fileType);
    }
  }

  private uploadFile(file: File, fileType: 'image' | 'document' | 'video') {
    let uploadObservable;

    if (fileType === 'image') {
      uploadObservable = this.filesService.uploadImage(file);
    } else if (fileType === 'document') {
      uploadObservable = this.filesService.uploadDocument(file);
    } else if (fileType === 'video') {
      uploadObservable = this.filesService.uploadVideo(file);
    }

    uploadObservable.subscribe({
      next: (response) => {
        this.uploadedFiles.push(response);
        this.messageService.add({ severity: 'info', summary: 'Success', detail: `${file.name} successfully uploaded.` });
      },
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: `Failed to upload ${file.name}.` });
      }
    });
  }

  onSelect(event: any) {
    this.messageService.add({ severity: 'info', summary: 'File Selected', detail: `${event.files.length} file(s) selected.` });
  }

}
