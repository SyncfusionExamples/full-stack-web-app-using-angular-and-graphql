import { gql } from 'apollo-angular';

export const GET_MOVIES = gql`
  query FetchMovieList {
    movieList {
      movieId
      title
      posterPath
      genre
      rating
      language
      duration
    }
  }
`;

export const GET_GENRE = gql`
  query FetchGenreList {
    genreList {
      genreId
      genreName
    }
  }
`;

export const GET_MOVIE_BY_ID = gql`
  query FilterMovieByID($filterInput: Int!) {
    movieList(where: { movieId: { eq: $filterInput } }) {
      movieId
      title
      posterPath
      genre
      rating
      language
      duration
      overview
    }
  }
`;
