import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTable } from './components/data-table/data-table';
import { Button } from './components/button/button';

@NgModule({
  declarations: [DataTable, Button],
  imports: [CommonModule],
  exports: [DataTable, Button],
})
export class SharedModule {}
