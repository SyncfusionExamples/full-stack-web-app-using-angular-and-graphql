import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { adminAuthGuard } from './admin-auth.guard';

describe('adminAuthGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => adminAuthGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
