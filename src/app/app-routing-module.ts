import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { guestGuard } from './core/guards/guest.guard';
import { roleGuard } from './core/guards/role.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth-module').then(m => m.AuthModule),
    canActivate: [guestGuard]
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard, roleGuard],
    loadChildren: () => import('./modules/dashboard/dashboard-module').then(m => m.DashboardModule),
    data: { expectedRoles: ['Administrator'] }
  },
  {
    path: 'requests',
    canActivate: [AuthGuard, roleGuard],
    loadChildren: () => import('./modules/requests/requests-module').then(m => m.RequestsModule),
    data: { expectedRoles: ['Administrator', 'Operator'] }
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'auth'
  },
  {
    path: '**',
    redirectTo: 'auth'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
