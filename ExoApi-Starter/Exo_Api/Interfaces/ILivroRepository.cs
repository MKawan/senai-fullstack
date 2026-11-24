using ExoApi.Models;

namespace ExoApi.Interfaces
{
    public interface ILivroRepository
    {
        List<Livro> Listar();
        Livro? BuscarPorId(int id);
        void Cadastrar(Livro livro);
        void Atualizar(int id, Livro livro);
        void Deletar(int id);
    }
}
