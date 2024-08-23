import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseModule } from 'src/app/base';
import { Routes, RouterModule } from '@angular/router';
import { canActivatePermission } from 'src/app/shared';
import { DashboardComponent } from './components';
import { ChartModule } from 'primeng/chart';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [canActivatePermission],
    data: { permissions: ['super'] },
  }
];

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    BaseModule,

    RouterModule.forChild(routes),

    ChartModule
  ]
})
export class DashboardModule { }
