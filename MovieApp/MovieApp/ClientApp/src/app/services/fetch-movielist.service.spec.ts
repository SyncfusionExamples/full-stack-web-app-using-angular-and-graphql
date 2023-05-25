import { TestBed } from '@angular/core/testing';

import { FetchMovielistService } from './fetch-movielist.service';

describe('FetchMovielistService', () => {
  let service: FetchMovielistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FetchMovielistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
