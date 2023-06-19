using MovieApp.Models;
using HotChocolate.Authorization;
using MovieApp.Interfaces;

namespace MovieApp.GraphQL
{
    [ExtendObjectType(typeof(MovieQueryResolver))]
    public class WatchlistQueryResolver
    {
        readonly IWatchlist _watchlistService;
        readonly IMovie _movieService;
        readonly IUser _userService;

        public WatchlistQueryResolver(IWatchlist watchlistService, IMovie movieService, IUser userService)
        {
            _watchlistService = watchlistService;
            _movieService = movieService;
            _userService = userService;
        }

        [Authorize]
        [GraphQLDescription("Get the user Watchlist.")]
        public async Task<List<Movie>> GetWatchlist(int userId)
        {
            bool user = await _userService.IsUserExists(userId);

            if (user)
            {
                string watchlistid = await _watchlistService.GetWatchlistId(userId);
                return await _movieService.GetMoviesAvailableInWatchlist(watchlistid);
            }
            else
            {
                return new List<Movie>();
            }
        }
    }
}
