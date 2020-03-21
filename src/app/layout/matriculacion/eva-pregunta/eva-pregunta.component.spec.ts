import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaPreguntaComponent } from './eva-pregunta.component';

describe('EvaPreguntaComponent', () => {
  let component: EvaPreguntaComponent;
  let fixture: ComponentFixture<EvaPreguntaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvaPreguntaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaPreguntaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
