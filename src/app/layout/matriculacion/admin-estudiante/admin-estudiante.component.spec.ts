import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEstudianteComponent } from './admin-estudiante.component';

describe('AdminEstudianteComponent', () => {
  let component: AdminEstudianteComponent;
  let fixture: ComponentFixture<AdminEstudianteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminEstudianteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEstudianteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
