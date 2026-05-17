import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTable } from './components/data-table/data-table';
import { Button } from './components/button/button';
import { FormField } from './components/form-field/form-field';
import { Modal } from './components/modal/modal';
import { StatusBadge } from './components/status-badge/status-badge';
import { StatCard } from './components/stat-card/stat-card';

@NgModule({
  declarations: [DataTable, Button, FormField, Modal, StatusBadge, StatCard],
  imports: [CommonModule],
  exports: [DataTable, Button, FormField, Modal, StatusBadge, StatCard],
})
export class SharedModule {}
