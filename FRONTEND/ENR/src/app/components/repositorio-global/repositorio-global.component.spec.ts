import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepositorioGlobalComponent } from './repositorio-global.component';

describe('RepositorioGlobalComponent', () => {
  let component: RepositorioGlobalComponent;
  let fixture: ComponentFixture<RepositorioGlobalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepositorioGlobalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepositorioGlobalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
