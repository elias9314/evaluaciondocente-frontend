import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosDocenteComponent } from './datos-docente.component';

describe('DatosDocenteComponent', () => {
  let component: DatosDocenteComponent;
  let fixture: ComponentFixture<DatosDocenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatosDocenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosDocenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
