import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminResultadosComponent } from './admin-resultados.component';

describe('AdminResultadosComponent', () => {
  let component: AdminResultadosComponent;
  let fixture: ComponentFixture<AdminResultadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminResultadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminResultadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
