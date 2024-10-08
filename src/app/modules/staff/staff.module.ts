import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaffDetailComponent, StaffListComponent } from './components';
import { RouterModule, Routes } from '@angular/router';
import { canActivatePermission } from 'src/app/shared';
import { BaseModule } from 'src/app/base';
import { PasswordModule } from 'primeng/password';
import { FileUploadModule } from 'primeng/fileupload';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FormsModule } from '@angular/forms';


const routes: Routes = [
  {
    path: '',
    component: StaffListComponent,
    canActivate: [canActivatePermission],
    data: { permissions: ['super'] },
  }
];


@NgModule({
  declarations: [
    StaffListComponent,
    StaffDetailComponent
  ],
  imports: [
    CommonModule,
    BaseModule,
    RouterModule.forChild(routes),

    PasswordModule,
    FileUploadModule,
    SelectButtonModule,

    FormsModule,
  ]
})
export class StaffModule { }
