import { Component, OnDestroy, OnInit } from '@angular/core';
import { MovieForm } from '../../models/movie-form';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY, ReplaySubject, map, switchMap, takeUntil } from 'rxjs';
import { FetchMovieByIdService } from 'src/app/services/fetch-movie-by-id.service';
import { Movie } from 'src/app/models/movie';
import { AddMovieService } from 'src/app/services/add-movie.service';
import { FetchMovielistService } from 'src/app/services/fetch-movielist.service';
import { UpdateMovieService } from 'src/app/services/update-movie.service';
import { MovieHelperService } from 'src/app/services/movie-helper.service';
import { ToastUtility } from '@syncfusion/ej2-notifications';

@Component({
  selector: 'app-movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.css'],
})
export class MovieFormComponent implements OnInit, OnDestroy {
  protected movieForm!: FormGroup<MovieForm>;
  protected formTitle = 'Add';
  private destroyed$ = new ReplaySubject<void>(1);
  movieId!: number;
  posterPreview!: ArrayBuffer | string | null;
  posterFile = '';
  moviePosterPath = '';
  public fields: Object = { text: 'genreName', value: 'genreName' };
  protected submitted = false;

  genreList$ = this.movieHelperService.genreList$;

  constructor(
    private readonly movieHelperService: MovieHelperService,
    private readonly router: Router,
    private readonly formBuilder: NonNullableFormBuilder,
    private readonly activatedRoute: ActivatedRoute,
    private readonly fetchMovieByIdService: FetchMovieByIdService,
    private readonly addMovieService: AddMovieService,
    private readonly fetchMovielistService: FetchMovielistService,
    private readonly updateMovieService: UpdateMovieService
  ) {
    this.initializeForm();
  }

  ngOnInit() {
    this.fetchMovieDetails();
  }

  protected get movieFormControl() {
    return this.movieForm.controls;
  }

  protected onFormSubmit(): void {
    this.submitted = true;
    if (!this.movieForm.valid) {
      return;
    }

    if (this.movieId) {
      this.updateMovie();
    } else {
      this.addMovie();
    }
  }

  uploadPoster(args: any) {
    const reader = new FileReader();
    reader.readAsDataURL(args.filesData[0].rawFile);
    reader.onloadend = (myevent) => {
      if (myevent.target?.result != null) {
        this.posterPreview = myevent.target.result;
        this.posterFile = (this.posterPreview as string).split(',')[1];
      }
    };
  }

  navigateToAdminPanel() {
    this.router.navigate(['/admin/movies']);
  }

  private initializeForm(): void {
    this.movieForm = this.formBuilder.group({
      movieId: 0,
      title: this.formBuilder.control('', Validators.required),
      genre: this.formBuilder.control('', Validators.required),
      language: this.formBuilder.control('', Validators.required),
      overview: this.formBuilder.control('', [
        Validators.required,
        Validators.maxLength(1000),
      ]),
      duration: this.formBuilder.control(0, [
        Validators.required,
        Validators.min(1),
      ]),
      rating: this.formBuilder.control(0, [
        Validators.required,
        Validators.min(0.0),
        Validators.max(10.0),
      ]),
    });
  }

  private fetchMovieDetails() {
    this.activatedRoute.paramMap
      .pipe(
        switchMap((params) => {
          this.movieId = Number(params.get('movieId'));
          if (this.movieId > 0) {
            this.formTitle = 'Edit';
            return this.fetchMovieByIdService
              .watch(
                {
                  filterInput: Number(this.movieId),
                },
                {
                  fetchPolicy: 'network-only',
                }
              )
              .valueChanges.pipe(map((result) => result.data));
          } else {
            return EMPTY;
          }
        }),
        takeUntil(this.destroyed$)
      )
      .subscribe({
        next: (result) => {
          if (result != undefined) {
            this.setMovieFormData(result.movieList[0]);
          }
        },
        error: (error) => {
          ToastUtility.show({
            content:
              'Error ocurred while fetching movie data. Please reload the page.',
            position: { X: 'Right', Y: 'Top' },
            cssClass: 'e-toast-danger',
          });
          console.error('Error ocurred while fetching movie data : ', error);
        },
      });
  }

  private setMovieFormData(movieFormData: Movie) {
    this.movieForm.setValue({
      movieId: movieFormData.movieId,
      title: movieFormData.title,
      genre: movieFormData.genre,
      language: movieFormData.language,
      duration: movieFormData.duration,
      rating: movieFormData.rating,
      overview: movieFormData.overview,
    });
    this.moviePosterPath = movieFormData.posterPath;
    this.posterPreview = '/Poster/' + this.moviePosterPath;
  }

  private addMovie() {
    const movieData: Movie = {
      movieId: this.movieForm.controls.movieId.value,
      title: this.movieForm.controls.title.value,
      duration: Number(this.movieForm.controls.duration.value),
      rating: Number(this.movieForm.controls.rating.value),
      genre: this.movieForm.controls.genre.value,
      language: this.movieForm.controls.language.value,
      overview: this.movieForm.controls.overview.value,
      posterPath: this.posterFile,
    };

    this.addMovieService
      .mutate({ movieData: movieData })
      .pipe(
        switchMap(() => this.fetchMovielistService.watch().refetch()),
        takeUntil(this.destroyed$)
      )
      .subscribe({
        next: () => {
          this.navigateToAdminPanel();
        },
        error: (error) => {
          ToastUtility.show({
            content: 'Error ocurred while adding movie data.',
            position: { X: 'Right', Y: 'Top' },
            cssClass: 'e-toast-danger',
          });
          console.error('Error ocurred while adding movie data : ', error);
        },
      });
  }

  private updateMovie() {
    const movieData: Movie = {
      movieId: this.movieForm.controls.movieId.value,
      title: this.movieForm.controls.title.value,
      duration: Number(this.movieForm.controls.duration.value),
      rating: Number(this.movieForm.controls.rating.value),
      genre: this.movieForm.controls.genre.value,
      language: this.movieForm.controls.language.value,
      overview: this.movieForm.controls.overview.value,
      posterPath:
        this.posterFile !== '' ? this.posterFile : this.moviePosterPath,
    };

    this.updateMovieService
      .mutate({ movieData: movieData })
      .pipe(
        switchMap(() => this.fetchMovielistService.watch().refetch()),
        takeUntil(this.destroyed$)
      )
      .subscribe({
        next: () => {
          this.navigateToAdminPanel();
        },
        error: (error) => {
          ToastUtility.show({
            content: 'Error ocurred while updating movie data.',
            position: { X: 'Right', Y: 'Top' },
            cssClass: 'e-toast-danger',
          });
          console.error('Error ocurred while updating movie data : ', error);
        },
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
