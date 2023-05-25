import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploaderModule } from '@syncfusion/ej2-angular-inputs';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { TextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { DropDownButtonModule } from '@syncfusion/ej2-angular-splitbuttons';
import { ToastModule } from '@syncfusion/ej2-angular-notifications';
import {
  FilterService,
  GridModule,
  SortService,
  PageService,
} from '@syncfusion/ej2-angular-grids';

const importedModules = [
  ButtonModule,
  TextBoxModule,
  UploaderModule,
  DropDownButtonModule,
  ToastModule,
  GridModule,
];

@NgModule({
  imports: [CommonModule, importedModules],
  exports: importedModules,
  providers: [PageService, SortService, FilterService],
})
export class AdminEj2ComponentsModule {}
