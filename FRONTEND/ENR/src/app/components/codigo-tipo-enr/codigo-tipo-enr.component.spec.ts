import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodigoTipoENRComponent } from './codigo-tipo-enr.component';

describe('CodigoTipoENRComponent', () => {
  let component: CodigoTipoENRComponent;
  let fixture: ComponentFixture<CodigoTipoENRComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodigoTipoENRComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodigoTipoENRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
