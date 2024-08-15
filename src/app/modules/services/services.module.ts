import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicesDetailComponent, ServicesListComponent } from './components';
import { RouterModule, Routes } from '@angular/router';
import { canActivatePermission, CustomCurrencyPipe } from 'src/app/shared';
import { BaseModule } from 'src/app/base';

const routes: Routes = [
  {
    path: '',
    component: ServicesListComponent,
    canActivate: [canActivatePermission],
    data: { permissions: ['super'] },
  }
];


@NgModule({
  declarations: [
    ServicesListComponent,
    ServicesDetailComponent,
    CustomCurrencyPipe
  ],
  imports: [
    CommonModule,
    BaseModule,
    RouterModule.forChild(routes),
  ]
})
export class ServicesModule { }
