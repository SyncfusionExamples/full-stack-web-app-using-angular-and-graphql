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
