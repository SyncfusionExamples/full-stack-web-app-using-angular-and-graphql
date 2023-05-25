import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppBarModule } from '@syncfusion/ej2-angular-navigations';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { TextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';

import { DropDownButtonModule } from '@syncfusion/ej2-angular-splitbuttons';
import { ToastModule } from '@syncfusion/ej2-angular-notifications';
import { ListViewModule } from '@syncfusion/ej2-angular-lists';

const importedModules = [
  AppBarModule,
  ButtonModule,
  TextBoxModule,
  DropDownListModule,
  DropDownButtonModule,
  ToastModule,
  ListViewModule,
];

@NgModule({
  imports: [CommonModule, importedModules],
  exports: importedModules,
})
export class Ej2ComponentsModule {}
