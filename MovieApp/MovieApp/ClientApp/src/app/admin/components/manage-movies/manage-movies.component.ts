import { Component } from '@angular/core';
import { map } from 'rxjs';
import { FetchMovielistService } from 'src/app/services/fetch-movielist.service';

@Component({
  selector: 'app-manage-movies',
  templateUrl: './manage-movies.component.html',
  styleUrls: ['./manage-movies.component.css'],
})
export class ManageMoviesComponent {
  public initialPage = { pageSizes: true };
  public initialSort = {
    columns: [{ field: 'name', direction: 'Ascending' }],
  };
  readonly movie$ = this.fetchMovielistService
    .watch()
    .valueChanges.pipe(map((result) => result.data));

  constructor(private readonly fetchMovielistService: FetchMovielistService) {}
}
