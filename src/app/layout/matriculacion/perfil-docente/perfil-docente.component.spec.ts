import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilDocenteComponent } from './perfil-docente.component';

describe('PerfilDocenteComponent', () => {
  let component: PerfilDocenteComponent;
  let fixture: ComponentFixture<PerfilDocenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerfilDocenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilDocenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
