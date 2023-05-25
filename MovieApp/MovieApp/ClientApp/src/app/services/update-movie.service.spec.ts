import { TestBed } from '@angular/core/testing';

import { UpdateMovieService } from './update-movie.service';

describe('UpdateMovieService', () => {
  let service: UpdateMovieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateMovieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
