using ExoApi.Models;
using Microsoft.EntityFrameworkCore;

namespace ExoApi.Contexts
{
    public class ChapterContext : DbContext
    {
        public ChapterContext(DbContextOptions<ChapterContext> options) : base(options) { }

        public DbSet<Livro> Livros { get; set; }
        public DbSet<Usuario> Usuarios { get; set; }
    }
}