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
  query FetchMovieList($filterInput: Int!) {
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

export const GET_SIMILAR_MOVIE = gql`
  query FetchSimilarMovies($movieId: Int!) {
    similarMovies(movieId: $movieId) {
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

export const GET_USERNAME_AVAILABILITY = gql`
  query UserNameAvailability($userName: String!) {
    isUserNameAvailable(userName: $userName)
  }
`;

export const GET_WATCHLIST = gql`
  query FetchWatchList($userId: Int!) {
    watchlist(userId: $userId) {
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
