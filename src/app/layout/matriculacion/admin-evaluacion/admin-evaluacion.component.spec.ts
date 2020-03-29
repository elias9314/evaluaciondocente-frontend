import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEvaluacionComponent } from './admin-evaluacion.component';

describe('AdminEvaluacionComponent', () => {
  let component: AdminEvaluacionComponent;
  let fixture: ComponentFixture<AdminEvaluacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminEvaluacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEvaluacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
