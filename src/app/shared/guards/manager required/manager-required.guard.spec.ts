import { TestBed } from '@angular/core/testing';

import { ManagerRequiredGuard } from './manager-required.guard';

describe('ManagerRequiredGuard', () => {
  let guard: ManagerRequiredGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ManagerRequiredGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
