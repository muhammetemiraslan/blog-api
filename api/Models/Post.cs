namespace api.Models;

public class Post
{
    public int Id { get; set; }
    public string Title { get; set; } = null!;
    public string Content { get; set; } = null!;
    public string Author { get; set; } = null!;
    public DateTime CreatedAt { get; set; }

    public string ImageUrl { get; set; } = null!;
    public string Category { get; set; } = null!;
}