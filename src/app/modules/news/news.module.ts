import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsDetailComponent, NewsListComponent } from './components';
import { Routes, RouterModule } from '@angular/router';
import { FileUploadModule } from 'primeng/fileupload';
import { SelectButtonModule } from 'primeng/selectbutton';
import { BaseModule } from 'src/app/base';
import { canActivatePermission } from 'src/app/shared';

const routes: Routes = [
  {
    path: '',
    component: NewsListComponent,
    canActivate: [canActivatePermission],
    data: { permissions: ['super'] },
  }
];

@NgModule({
  declarations: [
    NewsListComponent,
    NewsDetailComponent
  ],
  imports: [
    CommonModule,

    BaseModule,
    RouterModule.forChild(routes),

    FileUploadModule,
    SelectButtonModule,
  ]
})
export class NewsModule { }
