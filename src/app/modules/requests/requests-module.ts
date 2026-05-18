import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequestsRoutingModule } from './requests-routing-module';
import { RequestCreateOrEdit } from './pages/request-create-or-edit/request-create-or-edit';
import { RequestList } from './pages/request-list/request-list';
import { SharedModule } from '../../shared/shared-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RequestChangeStatus } from './pages/request-change-status/request-change-status';

@NgModule({
  declarations: [RequestCreateOrEdit, RequestList, RequestChangeStatus],
  imports: [CommonModule, RequestsRoutingModule, SharedModule, ReactiveFormsModule, FormsModule],
})
export class RequestsModule {}
