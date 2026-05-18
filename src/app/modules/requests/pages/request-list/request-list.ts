import { ChangeDetectorRef, Component, OnInit, ViewChild, computed, inject, signal } from '@angular/core';
import { RequestDto, RequestsService } from '../../../../core/api';
import { UiService } from '../../../../core/services/ui';
import { TableColumn } from '../../../../shared/interfaces/table-column.interface';
import { TableAction } from '../../../../shared/interfaces/table-action.interface';
import { RequestCreateOrEdit } from '../request-create-or-edit/request-create-or-edit';
import { RequestChangeStatus } from './../request-change-status/request-change-status';

@Component({
  selector: 'app-request-list',
  standalone: false,
  templateUrl: './request-list.html',
  styleUrl: './request-list.css',
})
export class RequestList implements OnInit {
  @ViewChild('requestForm') requestForm?: RequestCreateOrEdit;
  @ViewChild('statusComponent') statusComponent?: RequestChangeStatus;

  private requestsService = inject(RequestsService);
  private cdr = inject(ChangeDetectorRef)
  uiService = inject(UiService);

  // Estado del Modal y Edición
  public requestToEdit = signal<RequestDto | null | 'new'>(null);
  public isModalOpen = computed(() => this.requestToEdit() !== null);

  // NUEVO: Modal de Cambio de Estado
  public requestToChangeStatus = signal<RequestDto | null>(null);
  public isStatusModalOpen = computed(() => this.requestToChangeStatus() !== null);

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
      label: 'Estado', // REEMPLAZADO: Eliminar por Estado
      icon: 'pi pi-sync',
      class: 'btn-ghost text-success',
      callback: (item) => this.openStatusModal(item)
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

  openStatusModal(request: RequestDto) {
    this.requestToChangeStatus.set(request);
  }

  closeStatusModal(refresh: boolean = false) {
    this.requestToChangeStatus.set(null);
    if (refresh) this.loadRequests();
  }
}
