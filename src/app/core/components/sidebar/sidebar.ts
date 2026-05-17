import { Component, inject } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { MenuItem } from '../../interfaces/menu.inteface';

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  private authService = inject(AccountService);

  // Observable para mostrar/ocultar el sidebar según la sesión
  isLoggedIn$ = this.authService.authStatus$;

  // Definición de las opciones del menú
  menuItems: MenuItem[] = [
    { label: 'Panel Principal', icon: 'pi pi-chart-bar', route: '/dashboard' },
    { label: 'Mis Solicitudes', icon: 'pi pi-ticket', route: '/requests' },
    {
      label: 'Configuración Sistema',
      icon: 'pi pi-sliders-h',
      route: '/settings',
      roles: ['Administrator']
    },
  ];

  /**
   * Filtra el menú basándose en el rol persistido en el AuthService.
   * Si el item no tiene roles definidos, es público para cualquier usuario logueado.
   */
  get filteredMenu(): MenuItem[] {
    const role = this.authService.getUserRole();
    return this.menuItems.filter(item =>
      !item.roles || (role && item.roles.includes(role))
    );
  }

  /**
   * Lógica para cerrar la sesión centralizada.
   */
  logout(): void {
    this.authService.logout();
  }
}
