import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { ApiResponse } from '../interfaces/api-response.interface';

/**
 * Servicio global para la gestión de la interfaz de usuario y notificaciones.
 * Centraliza el uso de SweetAlert2 para mantener la consistencia visual en toda la aplicación.
 */
@Injectable({
  providedIn: 'root'
})
export class UiService {

  /**
   * Analiza una respuesta estandarizada del API y dispara la notificación correspondiente.
   * Utiliza el campo `success` para decidir si mostrar un mensaje de éxito o de error.
   * * @template T Tipo de dato contenido en la respuesta del API.
   * @param response Objeto de respuesta que sigue la estructura {@link ApiResponse}.
   * @example
   * this.uiService.handleResponse(res);
   */
  handleResponse<T>(response: ApiResponse<T>): void {
    if (response.success) {
      this.success(response.message || 'Operación realizada con éxito');
    } else {
      this.error(response.message || 'Ha ocurrido un error inesperado');
    }
  }

  /**
   * Muestra una alerta de éxito que se cierra automáticamente.
   * * @param message Cuerpo del mensaje explicativo.
   * @param title Título principal de la alerta. Por defecto: '¡Logrado!'.
   */
  success(message: string, title: string = '¡Logrado!'): void {
    Swal.fire({
      title: title,
      text: message,
      icon: 'success',
      confirmButtonColor: '#3085d6',
      timer: 3000,
      timerProgressBar: true
    });
  }

  /**
   * Muestra una alerta de error persistente (requiere interacción del usuario).
   * * @param message Descripción del error ocurrido.
   * @param title Título de la alerta. Por defecto: 'Error'.
   */
  error(message: string, title: string = 'Error'): void {
    Swal.fire({
      title: title,
      text: message,
      icon: 'error',
      confirmButtonColor: '#d33'
    });
  }

  /**
   * Bloquea la pantalla con una alerta de carga (Spinner).
   * Útil para procesos asíncronos largos donde se debe evitar la interacción del usuario.
   * * @param message Mensaje que acompaña al spinner. Por defecto: 'Procesando...'.
   */
  loading(message: string = 'Procesando...'): void {
    Swal.fire({
      title: message,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
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
   * Muestra un cuadro de diálogo de confirmación con botones 'Aceptar' y 'Cancelar'.
   * * @param title Pregunta o título de la confirmación.
   * @param text Información adicional sobre las consecuencias de la acción.
   * @returns Promesa que resuelve a `true` si el usuario confirma, o `false` si cancela.
   * * @example
   * const confirmed = await this.uiService.confirm('¿Eliminar?', 'Esta acción no se puede deshacer');
   * if (confirmed) { // Proceder con la eliminación }
   */
  async confirm(title: string, text: string): Promise<boolean> {
    const result = await Swal.fire({
      title: title,
      text: text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, confirmar',
      cancelButtonText: 'Cancelar'
    });
    return result.isConfirmed;
  }
}
