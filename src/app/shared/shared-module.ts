import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTable } from './components/data-table/data-table';
import { Button } from './components/button/button';
import { FormField } from './components/form-field/form-field';
import { Modal } from './components/modal/modal';

@NgModule({
  declarations: [DataTable, Button, FormField, Modal],
  imports: [CommonModule],
  exports: [DataTable, Button, FormField, Modal],
})
export class SharedModule {}
