import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestCreateOrEdit } from './request-create-or-edit';

describe('RequestCreateOrEdit', () => {
  let component: RequestCreateOrEdit;
  let fixture: ComponentFixture<RequestCreateOrEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RequestCreateOrEdit],
    }).compileComponents();

    fixture = TestBed.createComponent(RequestCreateOrEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
