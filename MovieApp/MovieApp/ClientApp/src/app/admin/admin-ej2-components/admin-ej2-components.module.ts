import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploaderModule } from '@syncfusion/ej2-angular-inputs';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { TextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { DropDownButtonModule } from '@syncfusion/ej2-angular-splitbuttons';
import { ToastModule } from '@syncfusion/ej2-angular-notifications';
import {
  GridModule,
  SortService,
  PageService,
  SearchService,
  ToolbarService,
} from '@syncfusion/ej2-angular-grids';
import { TooltipModule } from '@syncfusion/ej2-angular-popups';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';

const importedModules = [
  ButtonModule,
  TextBoxModule,
  UploaderModule,
  DropDownButtonModule,
  ToastModule,
  GridModule,
  TooltipModule,
  DropDownListModule,
];

@NgModule({
  imports: [CommonModule, importedModules],
  exports: importedModules,
  providers: [PageService, SortService, SearchService, ToolbarService],
})
export class AdminEj2ComponentsModule {}
