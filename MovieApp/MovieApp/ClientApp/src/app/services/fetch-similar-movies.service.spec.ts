import { TestBed } from '@angular/core/testing';

import { FetchSimilarMoviesService } from './fetch-similar-movies.service';

describe('FetchSimilarMoviesService', () => {
  let service: FetchSimilarMoviesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FetchSimilarMoviesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
