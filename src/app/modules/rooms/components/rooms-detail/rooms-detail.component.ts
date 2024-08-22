import { Component } from '@angular/core';
import { BaseDetailComponentList } from 'src/app/base';
import { IRoom } from 'src/interfaces';
import { RoomsService } from '../../services';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-rooms-detail',
  templateUrl: './rooms-detail.component.html',
  styleUrl: './rooms-detail.component.scss'
})
export class RoomsDetailComponent extends BaseDetailComponentList<IRoom> {
  rooms!: IRoom[]
  type_id!:number
  parent_id!:string

  ocupied = [
    {name: "Bo'sh", value: false},
    {name: "Band", value: true}
  ]

  constructor(
    private baseSrv: RoomsService,
    private messageService: MessageService,
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef
  ) {
    super(baseSrv, messageService, config, ref)
  }

  override ngOnInit(): void {
    let params = new HttpParams();

    if(this.$config.data.parent_id){
      params = params.set('parent_id', this.$config.data.parent_id);
      // if(this.$config.data.id){
      // }else{
      //   params = params.set('parent_id', this.$config.data.parent_id);
      // }
    }

    this.baseSrv.getAll(params).subscribe((staff) => {
      this.rooms = staff
    })

    this.type_id = this.$config.data.type_id;
    this.parent_id = this.$config.data.parent_id;

    console.log(this.type_id, this.parent_id, this.$config.data.id)

    

    // forma elementlari
    this.$form = new FormGroup({
      room_name: new FormControl('', [Validators.required]),
      is_occupied: new FormControl(false, [Validators.required]),
      type_id: new FormControl(1, [Validators.required]),
      parent_id: new FormControl('', [this.type_id == 1 ? Validators.min(1) : Validators.required]),
    });

    if (this.type_id == 1){
      this.$form.get('parent_id')?.disable()
    }

    this.$form.patchValue({
      type_id: this.type_id,
      parent_id: this.parent_id,
    })

    console.log(this.$form.value)

    super.ngOnInit()
  }
}
