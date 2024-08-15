import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SallaryDetailComponent, SallaryListComponent } from './components';
import { RouterModule, Routes } from '@angular/router';
import { canActivatePermission } from 'src/app/shared';
import { BaseModule } from 'src/app/base';

const routes: Routes = [
  {
    path: '',
    component: SallaryListComponent,
    canActivate: [canActivatePermission],
    data: { permissions: ['super'] },
  }
];


@NgModule({
  declarations: [
    SallaryListComponent,
    SallaryDetailComponent
  ],
  imports: [
    CommonModule,
    BaseModule,
    RouterModule.forChild(routes),
  ]
})
export class SallaryModule { }
