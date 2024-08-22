import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientDetailComponent, PatientListComponent } from './components';
import { RouterModule, Routes } from '@angular/router';
import { canActivatePermission } from 'src/app/shared';
import { BaseModule } from 'src/app/base';
import { FormsModule } from '@angular/forms';
import { SelectButtonModule } from 'primeng/selectbutton';

const routes: Routes = [
  {
    path: '',
    component: PatientListComponent,
    canActivate: [canActivatePermission],
    data: { permissions: ['super'] },
  }
];


@NgModule({
  declarations: [
    PatientListComponent,
    PatientDetailComponent
  ],
  imports: [
    CommonModule,
    
    BaseModule,
    RouterModule.forChild(routes),
    
    SelectButtonModule,

    FormsModule,
  ]
})
export class PatientModule { }
