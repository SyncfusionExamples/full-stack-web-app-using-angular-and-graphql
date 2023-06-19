export interface Movie {
  movieId: number;
  title: string;
  overview: string;
  genre: string;
  language: string;
  duration: number;
  rating: number;
  posterPath: string | ArrayBuffer | null;
}

export type MovieType = {
  movieList: Movie[];
};

export type SimilarMovieType = {
  similarMovies: Movie[];
};

export type WatchlistType = {
  watchlist: Movie[];
};

export type ToggleWatchlistType = {
  toggleWatchlist: Movie[];
};
