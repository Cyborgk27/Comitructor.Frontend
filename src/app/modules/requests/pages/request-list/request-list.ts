import { ChangeDetectorRef, Component, OnInit, ViewChild, computed, inject, signal } from '@angular/core';
import { RequestDto, RequestsService } from '../../../../core/api';
import { UiService } from '../../../../core/services/ui';
import { TableColumn } from '../../../../shared/interfaces/table-column.interface';
import { TableAction } from '../../../../shared/interfaces/table-action.interface';
import { RequestCreateOrEdit } from '../request-create-or-edit/request-create-or-edit';

@Component({
  selector: 'app-request-list',
  standalone: false,
  templateUrl: './request-list.html',
  styleUrl: './request-list.css',
})
export class RequestList implements OnInit {
  @ViewChild('requestForm') requestForm?: RequestCreateOrEdit;

  private requestsService = inject(RequestsService);
  private cdr = inject(ChangeDetectorRef)
  uiService = inject(UiService);

  // Estado del Modal y Edición
  public requestToEdit = signal<RequestDto | null | 'new'>(null);
  public isModalOpen = computed(() => this.requestToEdit() !== null);

  // Estado de los datos
  public requests = signal<RequestDto[]>([]);
  public isLoading = signal(false);

  public columns: TableColumn[] = [
    { label: 'Id', key: 'id' },
    { label: 'Folio', key: 'code' },
    { label: 'Descripción', key: 'description' },
    { label: 'Estado', key: 'status', type: 'badge' },
    { label: 'Fecha Reg.', key: 'createdDate', type: 'date' }
  ];

  public actions: TableAction[] = [
    {
      label: 'Editar',
      icon: 'pi pi-pencil',
      class: 'btn-ghost text-primary',
      callback: (item) => this.openModal(item)
    },
    {
      label: 'Eliminar',
      icon: 'pi pi-trash',
      class: 'btn-ghost text-error',
      callback: (item) => this.deleteRequest(item)
    }
  ];

  ngOnInit(): void {
    this.loadRequests();
  }

  loadRequests() {
    this.isLoading.set(true);
    this.requestsService.apiRequestsGet().subscribe({
      next: (res) => {
        this.requests.set(res.data || []);
        this.isLoading.set(false);
        this.cdr.markForCheck();
      },
      error: () => {
        this.isLoading.set(false);
        this.uiService.error('No se pudieron obtener las peticiones');
        this.cdr.detectChanges()
      }
    });
  }

  openModal(request: RequestDto | 'new' = 'new') {
    this.requestToEdit.set(request);
  }

  closeModal(refresh: boolean = false) {
    this.requestToEdit.set(null);
    if (refresh) this.loadRequests();
  }

  deleteRequest(item: RequestDto) {
    this.uiService.confirm('¿Seguro?', 'Esta acción no se puede deshacer').then(confirmed => {
      if (confirmed) {
        this.uiService.loading('Eliminando...');
        // Aquí deberías llamar a tu servicio de delete real:
        // this.requestsService.apiRequestsIdDelete(item.id).subscribe(...)
        setTimeout(() => {
          this.uiService.success('Petición eliminada');
          this.loadRequests();
        }, 1500);
      }
    });
  }

  handleConfirm() {
    if (this.requestForm) {
      this.requestForm.onSubmit();
    }
  }
}
