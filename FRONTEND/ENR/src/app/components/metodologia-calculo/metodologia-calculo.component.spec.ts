import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MetodologiaCalculoComponent } from './metodologia-calculo.component';

describe('MetodologiaCalculoComponent', () => {
  let component: MetodologiaCalculoComponent;
  let fixture: ComponentFixture<MetodologiaCalculoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MetodologiaCalculoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MetodologiaCalculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
