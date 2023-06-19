using HotChocolate.Authorization;
using MovieApp.Interfaces;
using MovieApp.Models;

namespace MovieApp.GraphQL
{
    [ExtendObjectType(typeof(MovieMutationResolver))]
    public class WatchlistMutationResolver
    {
        readonly IWatchlist _watchlistService;
        readonly IMovie _movieService;
        readonly IUser _userService;

        public WatchlistMutationResolver(IWatchlist watchlistService, IMovie movieService, IUser userService)
        {
            _watchlistService = watchlistService;
            _movieService = movieService;
            _userService = userService;
        }


        [Authorize]
        [GraphQLDescription("Toggle Watchlist item.")]
        public async Task<List<Movie>> ToggleWatchlist(int userId, int movieId)
        {
            await _watchlistService.ToggleWatchlistItem(userId, movieId);

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

        [Authorize]
        [GraphQLDescription("Delete all items from Watchlist.")]
        public async Task<int> ClearWatchlist(int userId)
        {
            await _watchlistService.ClearWatchlist(userId);
            return userId;
        }
    }
}
