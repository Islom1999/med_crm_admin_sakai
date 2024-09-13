import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientHistoryDetailComponent, PatientHistoryInfoComponent, PatientHistoryListComponent } from './components';
import { SharedModule } from 'primeng/api';
import { RouterModule, Routes } from '@angular/router';
import { canActivatePermission } from 'src/app/shared';
import { FormsModule } from '@angular/forms';
import { FileUploadModule } from 'primeng/fileupload';
import { SelectButtonModule } from 'primeng/selectbutton';
import { BaseModule } from 'src/app/base';

const routes: Routes = [
  {
    path: '',
    component: PatientHistoryListComponent,
    canActivate: [canActivatePermission],
    data: { permissions: ['super'] },
  },
  {
    path: 'doctor',
    component: PatientHistoryListComponent,
    canActivate: [canActivatePermission],
    data: { permissions: ['super'] },
  }
];

@NgModule({
  declarations: [
    PatientHistoryListComponent,
    PatientHistoryDetailComponent,
    PatientHistoryInfoComponent
  ],
  imports: [
    CommonModule,
    BaseModule,
    
    RouterModule.forChild(routes),
    
    SelectButtonModule,
    FileUploadModule,

    FormsModule,
  ]
})
export class PatientHistoryModule { }
