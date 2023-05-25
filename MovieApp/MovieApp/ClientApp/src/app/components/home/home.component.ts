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
  private readonly queryParams$ = this.activatedRoute.queryParams;
  private readonly movie$ = this.fetchMovielistService
    .watch()
    .valueChanges.pipe(map((result) => result.data));

  vm$ = this.queryParams$.pipe(
    combineLatestWith(this.movie$),
    map(([params, movies]) => {
      let homeVm = new Vm();

      homeVm.selectedGenre = params['genre'];
      homeVm.selectedSort = params['sortBy'];
      homeVm.selectedFilter = params['item'];

      if (homeVm.selectedGenre) {
        const filteredMovieByGenre = movies?.movieList.filter(
          (movie) => movie.genre.toLocaleLowerCase() === homeVm.selectedGenre
        );
        homeVm.movieList = filteredMovieByGenre;
      } else {
        homeVm.movieList = movies?.movieList;
      }

      // Implement sort using GQL
      if (homeVm.selectedSort) {
        switch (homeVm.selectedSort) {
          case 'title':
          default:
            homeVm.movieList.sort((a, b) => a.title.localeCompare(b.title));
            break;
          case 'rating':
            homeVm.movieList.sort((a, b) => {
              return a.rating > b.rating ? -1 : 1;
            });
            break;
          case 'duration':
            homeVm.movieList.sort((a, b) => {
              return a.duration > b.duration ? -1 : 1;
            });
            break;
        }
      } else {
        homeVm.movieList
          ?.slice()
          .sort((a, b) => a.title.localeCompare(b.title));
      }

      if (homeVm.selectedFilter) {
        const filteredMovie = movies?.movieList.filter(
          (movie) =>
            movie.title.toLowerCase().indexOf(homeVm.selectedFilter) !== -1 ||
            movie.genre.toLowerCase().indexOf(homeVm.selectedFilter) !== -1
        );
        homeVm.movieList = filteredMovie;
      }

      return homeVm;
    })
  );

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly fetchMovielistService: FetchMovielistService
  ) {}
}

class Vm {
  movieList: Movie[];
  selectedGenre: string;
  selectedSort: string;
  selectedFilter: string;

  constructor() {
    this.movieList = new Array<Movie>();
    this.selectedGenre = '';
    this.selectedSort = '';
    this.selectedFilter = '';
  }
}
