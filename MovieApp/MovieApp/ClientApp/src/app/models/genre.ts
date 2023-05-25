export interface Genre {
  genreId: number;
  genreName: string;
}

export type GenreType = {
  genreList: Genre[];
};
