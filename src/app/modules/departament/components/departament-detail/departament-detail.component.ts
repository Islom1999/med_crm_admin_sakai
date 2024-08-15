import { Component } from '@angular/core';
import { BaseDetailComponentList } from 'src/app/base';
import { IDepartament } from 'src/interfaces/departament';
import { DepartamentService } from '../../services';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-departament-detail',
  templateUrl: './departament-detail.component.html',
  styleUrl: './departament-detail.component.scss'
})
export class DepartamentDetailComponent extends BaseDetailComponentList<IDepartament> {
  constructor(
    private baseSrv: DepartamentService,
    private messageService: MessageService,
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef
  ) {
    super(baseSrv, messageService, config, ref)
  }

  override ngOnInit(): void {
    // forma elementlari
    this.$form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      descr : new FormControl('', [Validators.required]),
    });

    // id ga qarab update yoki create ni aniqlaydi parentda
    super.ngOnInit()
  }
}
