import { Component, Input, Output, EventEmitter, inject, signal, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RequestDto, RequestsService, UserResponseDto } from '../../../../core/api';
import { IPrioriy } from '../interfaces/priority.interface';
import { IArea } from '../interfaces/area.interface';
import { UiService } from '../../../../core/services/ui';

@Component({
  selector: 'app-request-create-or-edit',
  standalone: false,
  templateUrl: './request-create-or-edit.html',
  styleUrl: './request-create-or-edit.css',
})
export class RequestCreateOrEdit implements OnChanges, OnInit {

  private requestService = inject(RequestsService);
  private fb = inject(FormBuilder);
  private ui = inject(UiService)

  @Input() requestData: RequestDto | null = null;
  @Output() onClose = new EventEmitter<boolean>();

  public isLoading = signal(false);

  public users = signal<UserResponseDto[]>([]);

  public requestForm: FormGroup = this.fb.group({
    id: [null],
    title: ['', [Validators.required, Validators.minLength(5)]],
    description: ['', [Validators.required, Validators.maxLength(500)]],
    priority: ['Low', [Validators.required]],
    area: ['Systems', [Validators.required]],
    dueDate: [null],
    assignedUserId: [0]
  });

  // Listas para los combos
  priorities: IPrioriy[] = [
    { label: 'Baja', value: 'Low' },
    { label: 'Media', value: 'Medium' },
    { label: 'Alta', value: 'High' },
    { label: 'Crítica', value: 'Critical' },
  ];

  areas: IArea[] = [
    { label: 'Sistemas', value: 'Systems' },
    { label: 'Bodega', value: 'Warehouse' },
    { label: 'Compras', value: 'Purchasing' },
    { label: 'Ventas', value: 'Sales' },
    { label: 'Talento Humano', value: 'HumanResources' },
    { label: 'Mantenimiento', value: 'Maintenance' },
  ];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['requestData'] && this.requestData) {
      if (this.requestData.id) {
        this.loadRequestDetail(this.requestData.id);
      } else {
        this.requestForm.patchValue(this.requestData);
      }
    } else if (changes['requestData'] && !this.requestData) {
      this.requestForm.reset({ priority: 'Low', area: 'Systems' });
    }
  }
  ngOnInit(): void {
    this.loadUsers();
  }

  private loadUsers(): void {
    this.requestService.apiRequestsUsersLookupGet().subscribe({
      next: (res: any) => {
        if(res) {
          this.users.set(res.data)
        }
      },
      error: (err) => console.error('Error cargando usuarios', err)
    });
  }

  private loadRequestDetail(id: number): void {
    this.isLoading.set(true);

    this.requestService.apiRequestsIdGet(id).subscribe({
      next: (res) => {
        if (res) {
          const formattedDate = res.data?.dueDate
            ? new Date(res.data.dueDate).toISOString().split('T')[0]
            : null;

          this.requestForm.patchValue({
            ...res.data,
            dueDate: formattedDate
          });
        }
      },
      error: (err) => {
        console.error('Error cargando detalle', err);
        this.ui.error('No se pudo cargar la información de la solicitud');
      },
      complete: () => this.isLoading.set(false)
    });
  }

  isFieldInvalid(field: string): boolean {
    const control = this.requestForm.get(field);
    return !!(control && control.errors && (control.dirty || control.touched));
  }

  onSubmit(): void {
    if (this.requestForm.invalid) {
      this.requestForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    const formData = this.requestForm.value;

    formData.assignedUserId = parseInt(formData.assignedUserId)

    if (formData.id) {
      this.requestService.apiRequestsPut(formData).subscribe({
        next: (response) => {
          this.onClose.emit(true)
          this.ui.success('Solicitud actualizada')
        },
        error: (error) => {
          console.error('Error al guardar', error);
          this.isLoading.set(false);
        },
      })
      this.isLoading.set(false);
    } else {
      this.requestService.apiRequestsPost(formData).subscribe({
        next: (response) => {
          console.log('Solicitud guardada con éxito, ID generado:', response.data);
          this.ui.success('Solicitud generada')
          this.onClose.emit(true);
        },
        error: (res) => {
          console.error('Error al guardar', res.error.message);
          this.ui.error(res.error.message)
          this.isLoading.set(false);
        },
        complete: () => {
          this.isLoading.set(false);
        }
      });
    }
  }

  cancel(): void {
    this.onClose.emit(false);
  }
}
