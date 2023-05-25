import { TestBed } from '@angular/core/testing';

import { FetchMovieByIdService } from './fetch-movie-by-id.service';

describe('FetchMovieByIdService', () => {
  let service: FetchMovieByIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FetchMovieByIdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
