import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-status-badge',
  standalone: false,
  templateUrl: './status-badge.html',
  styleUrl: './status-badge.css',
})
export class StatusBadge implements OnChanges {
  @Input() status: string = '';

  config = { label: 'Desconocido', class: 'badge-ghost', icon: 'pi pi-question' };

  ngOnChanges() {
    const states: any = {
      'PENDING': { label: 'Pendiente', class: 'badge-warning text-warning-content', icon: 'pi pi-clock' },
      'APPROVED': { label: 'Aprobado', class: 'badge-success text-success-content', icon: 'pi pi-check-circle' },
      'IN_PROGRESS': { label: 'En Curso', class: 'badge-info text-info-content', icon: 'pi pi-cog animate-spin' },
      'REJECTED': { label: 'Rechazado', class: 'badge-error text-error-content', icon: 'pi pi-times' },
      'COMPLETED': { label: 'Finalizado', class: 'badge-neutral', icon: 'pi pi-flag' }
    };
    this.config = states[this.status.toUpperCase()] || this.config;
  }
}
