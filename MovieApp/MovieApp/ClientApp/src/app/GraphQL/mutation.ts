import { gql } from 'apollo-angular';

export const ADD_MOVIE = gql`
  mutation AddEmployeeData($movieData: MovieInput!) {
    addMovie(movie: $movieData) {
      movie {
        title
      }
    }
  }
`;

export const UPDATE_MOVIE = gql`
  mutation EditMovieData($movieData: MovieInput!) {
    editMovie(movie: $movieData) {
      movie {
        title
      }
    }
  }
`;

export const DELETE_MOVIE = gql`
  mutation DeleteMovieData($movieId: Int!) {
    deleteMovie(movieId: $movieId)
  }
`;

export const LOGIN = gql`
  mutation login($loginData: UserLoginInput!) {
    userLogin(userDetails: $loginData) {
      errorMessage
      token
    }
  }
`;

export const REGISTER_USER = gql`
  mutation register($registrationData: UserRegistrationInput!) {
    userRegistration(registrationData: $registrationData) {
      isRegistrationSuccess
      errorMessage
    }
  }
`;

export const TOGGLE_WATCHLIST = gql`
  mutation toggleUserWatchlist($userId: Int!, $movieId: Int!) {
    toggleWatchlist(userId: $userId, movieId: $movieId) {
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

export const CLEAR_WATCHLIST = gql`
  mutation clearWatchlist($userId: Int!) {
    clearWatchlist(userId: $userId)
  }
`;
