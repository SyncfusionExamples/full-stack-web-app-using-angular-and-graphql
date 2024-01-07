using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using MovieApp.Dto;
using MovieApp.Interfaces;
using MovieApp.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace MovieApp.GraphQL
{
    [ExtendObjectType(typeof(MovieMutationResolver))]
    public class AuthMutationResolver
    {
        readonly IUser _userService;
        readonly IConfiguration _config;

        public AuthMutationResolver(IConfiguration config, IUser userService)
        {
            _config = config;
            _userService = userService;
        }

        [GraphQLDescription("Authenticate the user.")]
        public AuthResponse? UserLogin(UserLogin userDetails)
        {
            AuthenticatedUser authenticatedUser = _userService.AuthenticateUser(userDetails);

            if (!string.IsNullOrEmpty(authenticatedUser.Username))
            {
                string tokenString = GenerateJSONWebToken(authenticatedUser);

                return new AuthResponse { Token = tokenString };
            }

            else
            {
                return null;
            }
        }

        [GraphQLDescription("Register a new user.")]
        public async Task<RegistrationResponse> UserRegistration([FromBody] UserRegistration registrationData)
        {
            UserMaster user = new()
            {
                FirstName = registrationData.FirstName,
                LastName = registrationData.LastName,
                Username = registrationData.Username,
                Password = registrationData.Password,
                Gender = registrationData.Gender,
                UserTypeName = UserRoles.User
            };

            bool userRegistrationStatus = await _userService.RegisterUser(user);

            if (userRegistrationStatus)
            {
                return new RegistrationResponse { IsRegistrationSuccess = true };
            }
            else
            {
                return new RegistrationResponse { IsRegistrationSuccess = false, ErrorMessage = "This User Name is not available." };
            }
        }

        string GenerateJSONWebToken(AuthenticatedUser userInfo)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:SecretKey"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            List<Claim> userClaims = new()
            {
                new Claim(JwtRegisteredClaimNames.Name, userInfo.Username),
                new Claim(JwtRegisteredClaimNames.Sub, userInfo.UserTypeName),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(ClaimTypes.Role,userInfo.UserTypeName),
                new Claim("userId", userInfo.UserId.ToString()),
            };

            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Audience"],
                claims: userClaims,
                expires: DateTime.Now.AddHours(24),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
