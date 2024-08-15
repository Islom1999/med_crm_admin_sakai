import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepartamentDetailComponent, DepartamentListComponent } from './components';
import { RouterModule, Routes } from '@angular/router';
import { BaseModule } from 'src/app/base';
import { canActivatePermission } from 'src/app/shared';

const routes: Routes = [
  {
    path: '',
    component: DepartamentListComponent,
    canActivate: [canActivatePermission],
    data: { permissions: ['super'] },
  }
];

@NgModule({
  declarations: [
    DepartamentListComponent,
    DepartamentDetailComponent
  ],
  imports: [
    CommonModule,
    BaseModule,
    RouterModule.forChild(routes),
  ]
})
export class DepartamentModule { }
