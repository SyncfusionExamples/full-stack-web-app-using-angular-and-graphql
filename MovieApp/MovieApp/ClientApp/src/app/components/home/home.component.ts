import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatestWith, map } from 'rxjs';
import { Movie } from 'src/app/models/movie';
import { FetchMovielistService } from 'src/app/services/fetch-movielist.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  private readonly movie$ = this.fetchMovielistService
    .watch({
      fetchPolicy: 'network-only',
    })
    .valueChanges.pipe(map((result) => result?.data));

  vm$ = this.activatedRoute.queryParams.pipe(
    combineLatestWith(this.movie$),
    map(([params, movies]) => {
      let homeVm = new Vm();

      homeVm.selectedGenre = params['genre'];
      homeVm.selectedSort = params['sortBy'];

      if (homeVm.selectedGenre) {
        const filteredMovieByGenre = movies?.movieList.filter(
          (movie) => movie.genre.toLocaleLowerCase() === homeVm.selectedGenre
        );
        homeVm.movieList = filteredMovieByGenre;
      } else {
        homeVm.movieList = movies?.movieList;
      }

      if (homeVm.selectedSort && movies?.movieList) {
        homeVm.movieList = this.sortMovie(
          homeVm.selectedSort,
          homeVm.movieList
        );
      } else {
        homeVm.movieList = this.sortMovie('title', homeVm.movieList);
      }

      return homeVm;
    })
  );

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly fetchMovielistService: FetchMovielistService
  ) {}

  private sortMovie(sortParam: string, movieList: Movie[]): Movie[] {
    const sortedMovieList = movieList?.slice();
    switch (sortParam) {
      case 'rating':
        sortedMovieList?.sort((a, b) => {
          return a.rating > b.rating ? -1 : 1;
        });
        break;

      case 'duration':
        sortedMovieList?.sort((a, b) => {
          return a.duration > b.duration ? -1 : 1;
        });
        break;

      case 'title':
      default:
        sortedMovieList?.sort((a, b) => a.title.localeCompare(b.title));
        break;
    }

    return sortedMovieList;
  }
}

class Vm {
  movieList: Movie[];
  selectedGenre: string;
  selectedSort: string;

  constructor() {
    this.movieList = [];
    this.selectedGenre = '';
    this.selectedSort = '';
  }
}
