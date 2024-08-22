import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomsDetailComponent, RoomsListComponent } from './components';
import { RouterModule, Routes } from '@angular/router';
import { canActivatePermission } from 'src/app/shared';
import { BaseModule } from 'src/app/base';
import { TreeTableModule } from 'primeng/treetable';

const routes: Routes = [
  {
    path: '',
    component: RoomsListComponent,
    canActivate: [canActivatePermission],
    data: { permissions: ['super'] },
  },
  {
    path: 'empty',
    component: RoomsListComponent,
    canActivate: [canActivatePermission],
    data: { permissions: ['super'], is_occupied: false },
  },
  {
    path: 'occupied',
    component: RoomsListComponent,
    canActivate: [canActivatePermission],
    data: { permissions: ['super'], is_occupied: true },
  }
];


@NgModule({
  declarations: [
    RoomsListComponent,
    RoomsDetailComponent
  ],
  imports: [
    CommonModule,
    BaseModule,
    RouterModule.forChild(routes),

    TreeTableModule
  ]
})
export class RoomsModule { }
