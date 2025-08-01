using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Data;

public class BlogContext : DbContext
{
    public BlogContext(DbContextOptions<BlogContext> options) : base(options) { }
    
    public DbSet<Post> Posts { get; set; }
}