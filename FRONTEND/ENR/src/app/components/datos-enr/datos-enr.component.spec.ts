import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosENRComponent } from './datos-enr.component';

describe('DatosENRComponent', () => {
  let component: DatosENRComponent;
  let fixture: ComponentFixture<DatosENRComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatosENRComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosENRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
