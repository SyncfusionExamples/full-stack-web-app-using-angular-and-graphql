﻿using HotChocolate.Authorization;
using MovieApp.Interfaces;
using MovieApp.Models;

namespace MovieApp.GraphQL
{
    public class MovieMutationResolver
    {
        public record AddMoviePayload(Movie movie);

        readonly IWebHostEnvironment _hostingEnvironment;
        readonly IMovie _movieService;
        readonly IConfiguration _config;
        readonly string posterFolderPath = string.Empty;

        public MovieMutationResolver(IConfiguration config, IMovie movieService, IWebHostEnvironment hostingEnvironment)
        {
            _config = config;
            _movieService = movieService;
            _hostingEnvironment = hostingEnvironment;
            posterFolderPath = System.IO.Path.Combine(_hostingEnvironment.WebRootPath, "Poster");
        }

        [Authorize(Policy = UserRoles.Admin)]
        [GraphQLDescription("Add a new movie data.")]
        public AddMoviePayload AddMovie(Movie movie)
        {
            if (!string.IsNullOrEmpty(movie.PosterPath))
            {
                string fileName = Guid.NewGuid() + ".jpg";
                string fullPath = System.IO.Path.Combine(posterFolderPath, fileName);

                //using (var stream = new FileStream(fullPath, FileMode.Create))
                //{
                //    movie.PosterPath.CopyTo(stream);
                //}
                using (FileStream reader = File.Create(fullPath))
                {
                    byte[] imageBytes = Convert.FromBase64String(movie.PosterPath);
                    //File.WriteAllBytes(fullPath, imageBytes);
                    reader.Write(imageBytes, 0, imageBytes.Length);
                }

                movie.PosterPath = fileName;
            }
            else
            {
                movie.PosterPath = _config["DefaultPoster"];
            }

            _movieService.AddMovie(movie);

            return new AddMoviePayload(movie);
        }


        [Authorize(Policy = UserRoles.Admin)]
        [GraphQLDescription("Edit an existing movie data.")]
        public async Task<AddMoviePayload> EditMovie(Movie movie)
        {
            bool IsBase64String = CheckBase64String(movie.PosterPath);

            if (IsBase64String)
            {
                string fileName = Guid.NewGuid() + ".jpg";
                string fullPath = System.IO.Path.Combine(posterFolderPath, fileName);

                byte[] imageBytes = Convert.FromBase64String(movie.PosterPath);
                File.WriteAllBytes(fullPath, imageBytes);

                movie.PosterPath = fileName;
            }

            await _movieService.UpdateMovie(movie);

            return new AddMoviePayload(movie);
        }

        [Authorize(Policy = UserRoles.Admin)]
        [GraphQLDescription("Delete a movie data.")]
        public async Task<int> DeleteMovie(int movieId)
        {
            string coverFileName = await _movieService.DeleteMovie(movieId);

            if (!string.IsNullOrEmpty(coverFileName) && coverFileName != _config["DefaultPoster"])
            {
                string fullPath = System.IO.Path.Combine(posterFolderPath, coverFileName);
                if (File.Exists(fullPath))
                {
                    File.Delete(fullPath);
                }
            }
            return movieId;
        }

        static bool CheckBase64String(string base64)
        {
            Span<byte> buffer = new(new byte[base64.Length]);
            return Convert.TryFromBase64String(base64, buffer, out int bytesParsed);
        }
    }
}
