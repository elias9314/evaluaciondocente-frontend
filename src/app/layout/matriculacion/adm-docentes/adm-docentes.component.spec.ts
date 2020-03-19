import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmDocentesComponent } from './adm-docentes.component';

describe('AdmDocentesComponent', () => {
  let component: AdmDocentesComponent;
  let fixture: ComponentFixture<AdmDocentesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmDocentesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmDocentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
