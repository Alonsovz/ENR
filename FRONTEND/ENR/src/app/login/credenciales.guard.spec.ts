import { TestBed, async, inject } from '@angular/core/testing';

import { CredencialesGuard } from './credenciales.guard';

describe('CredencialesGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CredencialesGuard]
    });
  });

  it('should ...', inject([CredencialesGuard], (guard: CredencialesGuard) => {
    expect(guard).toBeTruthy();
  }));
});
