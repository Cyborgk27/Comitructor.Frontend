import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTable } from './components/data-table/data-table';

@NgModule({
  declarations: [DataTable],
  imports: [CommonModule],
  exports: [
    DataTable,
    
  ]
})
export class SharedModule {}
