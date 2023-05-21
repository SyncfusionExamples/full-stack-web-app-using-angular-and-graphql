namespace MovieApp.Dto
{
    public class AuthResponse
    {
        public string ErrorMessage { get; set; } = string.Empty;

        public string? Token { get; set; } = string.Empty;
    }
}
