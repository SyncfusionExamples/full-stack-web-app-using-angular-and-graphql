import { TestBed } from '@angular/core/testing';

import { ValidateUserNameService } from './validate-user-name.service';

describe('ValidateUserNameService', () => {
  let service: ValidateUserNameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidateUserNameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
