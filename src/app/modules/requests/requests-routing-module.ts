import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RequestList } from './pages/request-list/request-list';
import { RequestCreateOrEdit } from './pages/request-create-or-edit/request-create-or-edit';

const routes: Routes = [
  {
    path: 'request-list',
    component: RequestList
  },
  {
    path: 'request/create',
    component: RequestCreateOrEdit
  },
  {
    path: 'request/edit/:id',
    component: RequestCreateOrEdit
  },
  {
    path: '**',
    redirectTo: 'request-list'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RequestsRoutingModule {}
