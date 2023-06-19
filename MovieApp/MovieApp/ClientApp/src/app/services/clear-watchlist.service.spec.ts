import { TestBed } from '@angular/core/testing';

import { ClearWatchlistService } from './clear-watchlist.service';

describe('ClearWatchlistService', () => {
  let service: ClearWatchlistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClearWatchlistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
