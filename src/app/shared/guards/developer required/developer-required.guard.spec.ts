import { TestBed } from '@angular/core/testing';

import { DeveloperRequiredGuard } from './developer-required.guard';

describe('DeveloperRequiredGuard', () => {
  let guard: DeveloperRequiredGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(DeveloperRequiredGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
