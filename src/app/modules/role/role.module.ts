import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleDetailComponent, RoleListComponent } from './components';
import { RouterModule, Routes } from '@angular/router';
import { BaseModule } from 'src/app/base';
import { canActivatePermission } from 'src/app/shared';

const routes: Routes = [
  {
    path: '',
    component: RoleListComponent,
    canActivate: [canActivatePermission],
    data: { permissions: ['super'] },
  }
];

@NgModule({
  declarations: [
    RoleListComponent,
    RoleDetailComponent
  ],
  imports: [
    CommonModule,
    BaseModule,
    RouterModule.forChild(routes),
  ]
})
export class RoleModule { }
