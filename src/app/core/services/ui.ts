import { Injectable } from '@angular/core';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import { ApiResponse } from '../interfaces/api-response.interface';

/**
 * Servicio global para la gestión de la interfaz de usuario y notificaciones.
 * Adaptado para el tema oscuro de DaisyUI y consistencia visual de Comitructor.
 */
@Injectable({
  providedIn: 'root'
})
export class UiService {

  /**
   * Configuración base para mantener el estilo oscuro y la fuente en todas las alertas.
   */
  private readonly darkConfig: SweetAlertOptions = {
    background: '#1d232a', // Fondo base-200 de DaisyUI Dark
    color: '#a6adbb',      // Texto base-content de DaisyUI Dark
    customClass: {
      popup: 'font-sans border border-base-300 shadow-xl rounded-2xl',
      title: 'font-sans text-xl font-bold',
      htmlContainer: 'font-sans',
      confirmButton: 'btn btn-primary px-6',
      cancelButton: 'btn btn-ghost'
    },
    buttonsStyling: false
  };

  /**
   * Analiza una respuesta estandarizada del API y dispara la notificación correspondiente.
   */
  handleResponse<T>(response: ApiResponse<T>): void {
    if (response.success) {
      this.success(response.message || 'Operación realizada con éxito');
    } else {
      this.error(response.message || 'Ha ocurrido un error inesperado');
    }
  }

  /**
   * Muestra una alerta de éxito con el color primario del tema.
   */
  success(message: string, title: string = '¡Logrado!'): void {
    Swal.fire({
      ...this.darkConfig,
      title: title,
      text: message,
      icon: 'success',
      iconColor: '#641ae6',
      timer: 3000,
      timerProgressBar: true
    });
  }

  /**
   * Muestra una alerta de error con el color de peligro del tema.
   */
  error(message: string, title: string = 'Error'): void {
    Swal.fire({
      ...this.darkConfig,
      title: title,
      text: message,
      icon: 'error',
      iconColor: '#ff5861'
    });
  }

  /**
   * Bloquea la pantalla con una alerta de carga (Spinner) adaptada al tema oscuro.
   */
  loading(message: string = 'Procesando...'): void {
    Swal.fire({
      ...this.darkConfig,
      title: message,
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
        const loader = Swal.getPopup()?.querySelector('.swal2-loader') as HTMLElement;
        if (loader) {
          loader.style.borderLeftColor = '#641ae6';
        }
      }
    });
  }

  /**
   * Cierra cualquier instancia activa de SweetAlert2.
   */
  close(): void {
    Swal.close();
  }

  /**
   * Cuadro de diálogo de confirmación con botones de DaisyUI.
   */
  async confirm(title: string, text: string): Promise<boolean> {
    const result = await Swal.fire({
      ...this.darkConfig,
      title: title,
      text: text,
      icon: 'warning',
      iconColor: '#fbbd23',
      showCancelButton: true,
      confirmButtonText: 'Sí, confirmar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    });
    return result.isConfirmed;
  }
}
