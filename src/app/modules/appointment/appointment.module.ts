import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentDetailComponent, AppointmentListComponent } from './components';
import { RouterModule, Routes } from '@angular/router';
import { canActivatePermission } from 'src/app/shared';
import { BaseModule } from 'src/app/base';

const routes: Routes = [
  {
    path: '',
    component: AppointmentListComponent,
    canActivate: [canActivatePermission],
    data: { permissions: ['super'] },
  }
];

@NgModule({
  declarations: [
    AppointmentListComponent,
    AppointmentDetailComponent
  ],
  imports: [
    CommonModule,

    BaseModule,
    RouterModule.forChild(routes),
  ]
})
export class AppointmentModule { }
