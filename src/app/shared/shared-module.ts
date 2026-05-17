import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTable } from './components/data-table/data-table';
import { Button } from './components/button/button';
import { FormField } from './components/form-field/form-field';

@NgModule({
  declarations: [DataTable, Button, FormField],
  imports: [CommonModule],
  exports: [DataTable, Button, FormField],
})
export class SharedModule {}
