import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { NgxPermissionsModule } from "ngx-permissions";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { InputTextModule } from "primeng/inputtext";
import { MultiSelectModule } from "primeng/multiselect";
import { TableModule } from "primeng/table";
import { ToastModule } from "primeng/toast";
import { InputTextareaModule } from 'primeng/inputtextarea';
import { EditorModule } from 'primeng/editor';
import { DropdownModule } from "primeng/dropdown";
import { InputNumberModule } from 'primeng/inputnumber';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CustomCurrencyPipe } from "src/app/shared";

@NgModule({
    declarations:[
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        NgxPermissionsModule,
        ToastModule,
        ReactiveFormsModule,

        // PrimeNG
        TableModule,
        InputTextModule,
        MultiSelectModule,
        ConfirmDialogModule,
        InputTextareaModule,
        EditorModule,
        DropdownModule,
        InputNumberModule,
        AutoCompleteModule,
    ],
    exports: [
        CommonModule,
        HttpClientModule,
        NgxPermissionsModule,
        ReactiveFormsModule,

        // PrimeNG
        TableModule,
        InputTextModule,
        MultiSelectModule,
        ConfirmDialogModule,
        InputTextareaModule,
        EditorModule,
        DropdownModule,
        InputNumberModule,
        AutoCompleteModule,

        // pipe 
    ],
})
export class BaseModule { }
