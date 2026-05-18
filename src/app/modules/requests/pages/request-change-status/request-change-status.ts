import { Component, EventEmitter, inject, Input, Output, signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { RequestHistoryDto, RequestsService } from '../../../../core/api';

@Component({
  selector: 'app-request-change-status',
  standalone: false,
  templateUrl: './request-change-status.html',
  styleUrl: './request-change-status.css',
})
export class RequestChangeStatus {
  @Input() requestId!: number;
  @Input() currentStatus!: string;
  @Output() onClose = new EventEmitter<boolean>();

  private fb = inject(FormBuilder);
  private requestService = inject(RequestsService);

  public history = signal<RequestHistoryDto[]>([]);
  public statusForm = this.fb.group({
    requestId: [0],
    newStatus: ['', Validators.required],
    comment: ['', [Validators.required, Validators.minLength(10)]]
  });

  statusOptions = [
    { label: 'Nuevo', value: 'New' },
    { label: 'En Progreso', value: 'InProgress' },
    { label: 'En Espera', value: 'OnHold' },
    { label: 'Cerrado', value: 'Closed' },
    { label: 'Cancelado', value: 'Cancelled' }
  ];

  ngOnInit() {
    this.statusForm.patchValue({
      requestId: this.requestId,
      newStatus: this.currentStatus
    });
    this.loadHistory();
  }

  loadHistory() {
    this.requestService.apiRequestsIdHistoryGet(this.requestId).subscribe({
      next: res => {
        this.history.set(res.data ?? [])
      }
    });
  }

  submitStatus() {
    if (this.statusForm.invalid) {
      this.statusForm.markAllAsTouched();
      return;
    }

    const form = this.statusForm.value

    this.requestService.apiRequestsUpdateStatusPut(
      form.requestId ?? 0,
      form.newStatus ?? '',
      form.comment ?? ''
    ).subscribe(() => {
      this.onClose.emit(true);
    });
  }
}
