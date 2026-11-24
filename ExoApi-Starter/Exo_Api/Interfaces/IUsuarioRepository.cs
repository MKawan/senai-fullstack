using ExoApi.Models;

namespace ExoApi.Interfaces
{
    public interface IUsuarioRepository
    {
        Usuario? Login(string email, string senha);
        Task<bool> Cadastrar(Usuario usuario, CancellationToken cancellationToken);
    }
}
