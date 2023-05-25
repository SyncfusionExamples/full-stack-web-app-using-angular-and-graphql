import { TestBed } from '@angular/core/testing';

import { FetchGenreService } from './fetch-genre.service';

describe('FetchGenreService', () => {
  let service: FetchGenreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FetchGenreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
