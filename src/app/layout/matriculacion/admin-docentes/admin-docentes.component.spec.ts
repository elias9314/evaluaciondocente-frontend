import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDocentesComponent } from './admin-docentes.component';

describe('AdminDocentesComponent', () => {
  let component: AdminDocentesComponent;
  let fixture: ComponentFixture<AdminDocentesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminDocentesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDocentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
