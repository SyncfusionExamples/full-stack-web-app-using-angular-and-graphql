import { TestBed } from '@angular/core/testing';

import { ToggleWatchlistService } from './toggle-watchlist.service';

describe('ToggleWatchlistService', () => {
  let service: ToggleWatchlistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToggleWatchlistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
