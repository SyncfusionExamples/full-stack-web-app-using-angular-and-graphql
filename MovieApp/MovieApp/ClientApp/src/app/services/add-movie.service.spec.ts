import { TestBed } from '@angular/core/testing';

import { AddMovieService } from './add-movie.service';

describe('AddMovieService', () => {
  let service: AddMovieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddMovieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
