import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilesDetailComponent, FilesListComponent } from './components';
import { BaseModule } from 'src/app/base';
import { RouterModule, Routes } from '@angular/router';
import { canActivatePermission } from 'src/app/shared';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { FileUploadModule } from 'primeng/fileupload';
import { FilesInfoComponent } from './components/files-info/files-info.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmPopupModule } from 'primeng/confirmpopup';

const routes: Routes = [
  {
    path: '',
    component: FilesListComponent,
    canActivate: [canActivatePermission],
    data: { permissions: ['super'] },
  }
];

@NgModule({
  declarations: [
    FilesListComponent,
    FilesDetailComponent,
    FilesInfoComponent
  ],
  imports: [
    CommonModule,
    BaseModule,
    RouterModule.forChild(routes),

    CardModule,
    TagModule,
    FileUploadModule,
  ]
})
export class FilesModule { }
