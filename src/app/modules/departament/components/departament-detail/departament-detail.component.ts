import { Component } from '@angular/core';
import { BaseDetailComponentList } from 'src/app/base';
import { IDepartament } from 'src/interfaces/departament';
import { DepartamentService } from '../../services';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-departament-detail',
  templateUrl: './departament-detail.component.html',
  styleUrl: './departament-detail.component.scss'
})
export class DepartamentDetailComponent extends BaseDetailComponentList<IDepartament> {
  public Editor = ClassicEditor;
  public editorConfig = {
    toolbar: [
      'heading', '|',
      'bold', 'italic', 'underline', 'strikethrough', '|',
      'fontSize', 'fontFamily', 'fontColor', 'fontBackgroundColor', '|',
      'link', 'bulletedList', 'numberedList', 'blockQuote', '|',
      'insertTable', 'tableColumn', 'tableRow', 'mergeTableCells', '|',
      'undo', 'redo', '|',
     
    ],
    heading: {
      options: [
        { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
        { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
        { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
        { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
        // Boshqa sozlamalar...
      ]
    },
    table: {
      contentToolbar: [ 'tableColumn', 'tableRow', 'mergeTableCells' ]
    },
    exportPdf: {
      stylesheets: [ '/path/to/styles.css' ],
      fileName: 'document.pdf',
      pageMargins: [ 20, 20, 20, 20 ],
      // Boshqa sozlamalar...
    },
    exportWord: {
      fileName: 'document.docx',
      stylesheets: [ '/path/to/word.css' ],
      // Boshqa sozlamalar...
    },
    // Boshqa plagin sozlamalari...
  };

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
      descr : new FormControl('Initial content...', [Validators.required]),
    });

    // id ga qarab update yoki create ni aniqlaydi parentda
    super.ngOnInit()
  }
}
