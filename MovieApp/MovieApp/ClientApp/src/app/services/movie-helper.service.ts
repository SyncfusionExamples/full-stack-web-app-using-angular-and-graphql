import { Injectable } from '@angular/core';
import { FetchGenreService } from './fetch-genre.service';
import { map, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MovieHelperService {
  genreList$ = this.fetchGenreService.watch().valueChanges.pipe(
    map((result) => result?.data),
    shareReplay(1)
  );

  constructor(private readonly fetchGenreService: FetchGenreService) {}
}
