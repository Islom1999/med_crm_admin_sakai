import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchemodueDetailComponent, SchemodueListComponent } from './components';
import { RouterModule, Routes } from '@angular/router';
import { canActivatePermission } from 'src/app/shared';
import { BaseModule } from 'src/app/base';

const routes: Routes = [
  {
    path: '',
    component: SchemodueListComponent,
    canActivate: [canActivatePermission],
    data: { permissions: ['super'] },
  }
];


@NgModule({
  declarations: [
    SchemodueListComponent,
    SchemodueDetailComponent
  ],
  imports: [
    CommonModule,
    BaseModule,
    RouterModule.forChild(routes),
  ]
})
export class SchemoduleModule { }
