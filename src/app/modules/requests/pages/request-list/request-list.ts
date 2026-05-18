import { ChangeDetectorRef, Component, OnInit, ViewChild, computed, inject, signal } from '@angular/core';
import { RequestDto, RequestsService } from '../../../../core/api';
import { UiService } from '../../../../core/services/ui';
import { TableColumn } from '../../../../shared/interfaces/table-column.interface';
import { TableAction } from '../../../../shared/interfaces/table-action.interface';
import { RequestCreateOrEdit } from '../request-create-or-edit/request-create-or-edit';
import { RequestChangeStatus } from './../request-change-status/request-change-status';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';

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
  private cdr = inject(ChangeDetectorRef);
  uiService = inject(UiService);

  // --- Signals de Estado de UI ---
  public requests = signal<RequestDto[]>([]);
  public isLoading = signal(false);
  public totalItems = signal(0);

  // --- Signals de Filtros y Paginación ---
  public currentPage = signal(1);
  public pageSize = signal(10);
  public searchTerm = signal('');
  public statusFilter = signal<string | undefined>(undefined);
  public priorityFilter = signal<string | undefined>(undefined);

  // Control para el buscador con debounce
  public searchControl = new FormControl('');

  // Modales
  public requestToEdit = signal<RequestDto | null | 'new'>(null);
  public isModalOpen = computed(() => this.requestToEdit() !== null);
  public requestToChangeStatus = signal<RequestDto | null>(null);
  public isStatusModalOpen = computed(() => this.requestToChangeStatus() !== null);

  public columns: TableColumn[] = [
    { label: 'Id', key: 'id' },
    { label: 'Folio', key: 'code' },
    { label: 'Descripción', key: 'description' },
    { label: 'Estado', key: 'status', type: 'badge' },
    { label: 'Prioridad', key: 'priority', type: 'badge' }, // Añadida prioridad
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
      label: 'Estado',
      icon: 'pi pi-sync',
      class: 'btn-ghost text-success',
      callback: (item) => this.openStatusModal(item)
    }
  ];

  ngOnInit(): void {
    this.setupSearch();
    this.loadRequests();
  }

  private setupSearch() {
    this.searchControl.valueChanges
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe(val => {
        this.searchTerm.set(val || '');
        this.currentPage.set(1); // Reset a pag 1 al buscar
        this.loadRequests();
      });
  }

  loadRequests() {
    this.isLoading.set(true);

    // Llamada al servicio con los nuevos parámetros del DTO de filtrado
    this.requestsService.apiRequestsGet(
      this.searchTerm(),
      this.statusFilter(),
      this.priorityFilter(),
      this.currentPage(),
      this.pageSize()
    ).subscribe({
      next: (res: any) => {
        this.requests.set(res.data?.items || []);
        this.totalItems.set(res.data?.totalCount || 0);
        this.isLoading.set(false);
        this.cdr.markForCheck();
      },
      error: () => {
        this.isLoading.set(false);
        this.uiService.error('Error al cargar peticiones');
      }
    });
  }

  // --- Handlers de Filtros ---
  onStatusFilter(status: string) {
    this.statusFilter.set(status || undefined);
    this.currentPage.set(1);
    this.loadRequests();
  }

  onPageChange(page: number) {
    this.currentPage.set(page);
    this.loadRequests();
  }

  // --- Gestión de Modales ---
  handleConfirm() {
    this.requestForm?.onSubmit();
  }

  handleStatusConfirm() {
    this.statusComponent?.submitStatus();
  }

  openModal(request: RequestDto | 'new' = 'new') {
    this.requestToEdit.set(request);
  }

  closeModal(refresh: boolean = false) {
    this.requestToEdit.set(null);
    if (refresh) this.loadRequests();
  }

  openStatusModal(request: RequestDto) {
    this.requestToChangeStatus.set(request);
  }

  closeStatusModal(refresh: boolean = false) {
    this.requestToChangeStatus.set(null);
    if (refresh) this.loadRequests();
  }
}
