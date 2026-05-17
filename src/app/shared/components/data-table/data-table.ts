import { Component, Input } from '@angular/core';
import { TableColumn } from '../../interfaces/table-column.interface';
import { TableAction } from '../../interfaces/table-action.interface';

@Component({
  selector: 'app-data-table',
  standalone: false,
  templateUrl: './data-table.html',
  styleUrl: './data-table.css',
})
export class DataTable<T> {
  @Input() data: T[] = [];

  @Input() columns: TableColumn[] = [];

  @Input() actions: TableAction[] = [];

  @Input() loading: boolean = false;

  /**
   * Usamos T para que el compilador sepa que 'item'
   * es una instancia de nuestro modelo.
   */
  getFieldValue(item: T, key: string): any {
    return (item as any)[key];
  }
}
