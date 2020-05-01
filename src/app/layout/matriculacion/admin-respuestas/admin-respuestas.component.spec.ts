import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRespuestasComponent } from './admin-respuestas.component';

describe('AdminRespuestasComponent', () => {
  let component: AdminRespuestasComponent;
  let fixture: ComponentFixture<AdminRespuestasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminRespuestasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminRespuestasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
