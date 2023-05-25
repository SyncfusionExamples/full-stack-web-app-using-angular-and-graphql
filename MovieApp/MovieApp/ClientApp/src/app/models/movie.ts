export interface Movie {
  movieId: number;
  title: string;
  overview: string;
  genre: string;
  language: string;
  duration: number;
  rating: number;
  posterPath: string;
}

export type MovieType = {
  movieList: Movie[];
};
