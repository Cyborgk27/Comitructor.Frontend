import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestChangeStatus } from './request-change-status';

describe('RequestChangeStatus', () => {
  let component: RequestChangeStatus;
  let fixture: ComponentFixture<RequestChangeStatus>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RequestChangeStatus],
    }).compileComponents();

    fixture = TestBed.createComponent(RequestChangeStatus);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
