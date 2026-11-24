using ExoApi.Contexts;
using ExoApi.Interfaces;
using ExoApi.Models;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace ExoApi.Repositories
{
    public class UsuarioRepository : IUsuarioRepository
    {
        private readonly ChapterContext _context;

        public UsuarioRepository(ChapterContext context)
        {
            _context = context;
        }

        public Usuario? Login(string email, string senha)
        {
            return _context.Usuarios
                .FirstOrDefault(u => u.Email == email && u.Senha == senha);
        }

        public async Task<bool> Cadastrar(Usuario usuario, CancellationToken cancellationToken)
        {
            _context.Usuarios.Add(usuario);

            try
            {
                await _context.SaveChangesAsync(cancellationToken);
                return true;
            }
            catch (DbUpdateException exception)
                when (exception.GetBaseException() is SqlException { Number: 2601 or 2627 })
            {
                return false;
            }
        }
    }
}
