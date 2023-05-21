using MovieApp.Interfaces;
using MovieApp.Models;

namespace MovieApp.GraphQL
{
    public class MovieQueryResolver
    {
        readonly IMovie _movieService;

        public MovieQueryResolver(IMovie movieService)
        {
            _movieService = movieService;
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
    }
}
