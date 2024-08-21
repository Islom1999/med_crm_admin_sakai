import { Component, Input, OnInit } from '@angular/core';
import { FilesService } from '../../services';
import { IFiles } from 'src/interfaces';
import { environment } from 'src/environments/environment';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-files-info',
  templateUrl: './files-info.component.html',
  styleUrl: './files-info.component.scss'
})
export class FilesInfoComponent implements OnInit {
  id!:string
  data!:IFiles

  constructor(
    private _baseSrv: FilesService,
    public config: DynamicDialogConfig,
    // public ref: DynamicDialogRef
  ){}

  ngOnInit(): void {
    this.id = this.config.data.id;
    this._baseSrv.getById(this.id)
      .subscribe(data => { 
        this.data = data
      })
  }

  getView(id:string){
    return `${environment.apiUrl}/files/view/${id}`
  }
}
