import { TestBed } from '@angular/core/testing';

import { FetchWatchlistService } from './fetch-watchlist.service';

describe('FetchWatchlistService', () => {
  let service: FetchWatchlistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FetchWatchlistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
