import { Component, OnInit, inject, signal } from '@angular/core';
import { RequestsService, RequestSummaryDto } from '../../../../core/api';
import { UiService } from '../../../../core/services/ui';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  private requestsService = inject(RequestsService);
  private uiService = inject(UiService);

  // Signal para almacenar el resumen
  public summary = signal<RequestSummaryDto | null>(null);
  public isLoading = signal(true);

  ngOnInit(): void {
    this.loadSummary();
  }

  loadSummary(): void {
    this.isLoading.set(true);
    this.requestsService.apiRequestsSummaryGet().subscribe({
      next: (res: any) => {
        this.summary.set(res.data);
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
        this.uiService.error('Error al cargar las métricas del dashboard');
      }
    });
  }
}
