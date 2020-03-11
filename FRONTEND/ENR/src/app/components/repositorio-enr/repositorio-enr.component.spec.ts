import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepositorioENRComponent } from './repositorio-enr.component';

describe('RepositorioENRComponent', () => {
  let component: RepositorioENRComponent;
  let fixture: ComponentFixture<RepositorioENRComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepositorioENRComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepositorioENRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
