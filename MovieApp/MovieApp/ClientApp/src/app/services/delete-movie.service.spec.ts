import { TestBed } from '@angular/core/testing';

import { DeleteMovieService } from './delete-movie.service';

describe('DeleteMovieService', () => {
  let service: DeleteMovieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeleteMovieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
