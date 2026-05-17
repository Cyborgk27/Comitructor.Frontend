import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequestsRoutingModule } from './requests-routing-module';
import { RequestCreateOrEdit } from './pages/request-create-or-edit/request-create-or-edit';
import { RequestList } from './pages/request-list/request-list';

@NgModule({
  declarations: [RequestCreateOrEdit, RequestList],
  imports: [CommonModule, RequestsRoutingModule],
})
export class RequestsModule {}
