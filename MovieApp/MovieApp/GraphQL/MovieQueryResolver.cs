using MovieApp.Interfaces;
using MovieApp.Models;

namespace MovieApp.GraphQL
{
    public class MovieQueryResolver
    {
        readonly IMovie _movieService;
        readonly IUser _userService;

        public MovieQueryResolver(IMovie movieService, IUser userService)
        {
            _movieService = movieService;
            _userService = userService;
        }

        [GraphQLDescription("Gets the list of genres.")]
        public async Task<List<Genre>> GetGenreList()
        {
            return await _movieService.GetGenre();
        }

        [GraphQLDescription("Gets the list of movies.")]
        [UseSorting]
        [UseFiltering]
        public async Task<IQueryable<Movie>> GetMovieList()
        {
            List<Movie> availableMovies = await _movieService.GetAllMovies();
            return availableMovies.AsQueryable();
        }

        [GraphQLDescription("Gets the list of movies which belongs to the same genre as the movie whose movieId is passed as parameter.")]
        public async Task<List<Movie>> GetSimilarMovies(int movieId)
        {
            return await _movieService.GetSimilarMovies(movieId);
        }

        [GraphQLDescription("Check if the username is available.")]
        public bool GetIsUserNameAvailable(string userName)
        {
            return _userService.CheckUserNameAvailability(userName);
        }
    }
}
