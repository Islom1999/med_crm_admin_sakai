import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaffDetailComponent, StaffListComponent } from './components';
import { RouterModule, Routes } from '@angular/router';
import { canActivatePermission } from 'src/app/shared';
import { BaseModule } from 'src/app/base';

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
  ]
})
export class StaffModule { }
