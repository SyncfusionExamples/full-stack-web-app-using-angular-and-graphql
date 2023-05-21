using System;
using System.Collections.Generic;

namespace MovieApp.Models;

public partial class Movie
{
    public int MovieId { get; set; }

    public string Title { get; set; } = null!;

    public string Overview { get; set; } = null!;

    public string Genre { get; set; } = null!;

    public string Language { get; set; } = null!;

    public int Duration { get; set; }

    public decimal? Rating { get; set; }

    public string? PosterPath { get; set; }
}
