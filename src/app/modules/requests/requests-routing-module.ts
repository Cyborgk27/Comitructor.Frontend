import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RequestList } from './pages/request-list/request-list';
import { RequestCreateOrEdit } from './pages/request-create-or-edit/request-create-or-edit';

const routes: Routes = [
  {
    path: 'list',
    component: RequestList
  },
  {
    path: 'create',
    component: RequestCreateOrEdit
  },
  {
    path: 'edit/:id',
    component: RequestCreateOrEdit
  },
  {
    path: '**',
    redirectTo: 'list'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RequestsRoutingModule {}
