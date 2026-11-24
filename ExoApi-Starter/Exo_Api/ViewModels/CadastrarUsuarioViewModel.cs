using System.ComponentModel.DataAnnotations;

namespace ExoApi.ViewModels
{
    /// <summary>
    /// Dados necessários para cadastrar um usuário.
    /// </summary>
    public sealed record CadastrarUsuarioViewModel
    {
        [Required]
        [EmailAddress]
        [StringLength(255)]
        public required string Email { get; init; }

        [Required]
        [StringLength(120)]
        public required string Senha { get; init; }
    }

    /// <summary>
    /// Dados públicos retornados após o cadastro de um usuário.
    /// </summary>
    public sealed record UsuarioResponse(int Id, string Email);
}
