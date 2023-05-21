using Microsoft.EntityFrameworkCore;
using MovieApp.Dto;
using MovieApp.Interfaces;
using MovieApp.Models;

namespace MovieApp.DataAccess
{
    public class UserDataAccessLayer : IUser
    {
        readonly MovieDbContext _dbContext;

        public UserDataAccessLayer(IDbContextFactory<MovieDbContext> dbContext)
        {
            _dbContext = dbContext.CreateDbContext();
        }

        public AuthenticatedUser AuthenticateUser(UserLogin loginCredentials)
        {
            AuthenticatedUser authenticatedUser = new();

            var userDetails = _dbContext.UserMasters
                .FirstOrDefault(u =>
                u.Username == loginCredentials.Username &&
                u.Password == loginCredentials.Password);

            if (userDetails != null)
            {
                authenticatedUser = new AuthenticatedUser
                {
                    Username = userDetails.Username,
                    UserId = userDetails.UserId,
                    UserTypeName = userDetails.UserTypeName
                };
            }
            return authenticatedUser;
        }


        public async Task<bool> IsUserExists(int userId)
        {
            UserMaster? user = await _dbContext.UserMasters.FirstOrDefaultAsync(x => x.UserId == userId);

            return user != null;
        }

        public async Task<bool> RegisterUser(UserMaster userData)
        {
            bool isUserNameAvailable = CheckUserNameAvailability(userData.Username);

            try
            {
                if (isUserNameAvailable)
                {
                    await _dbContext.UserMasters.AddAsync(userData);
                    await _dbContext.SaveChangesAsync();
                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch
            {
                throw;
            }
        }

        public bool CheckUserNameAvailability(string userName)
        {
            string? user = _dbContext.UserMasters.FirstOrDefault(x => x.Username == userName)?.ToString();

            return user == null;
        }

    }
}
