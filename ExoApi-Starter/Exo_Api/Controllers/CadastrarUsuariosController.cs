using ExoApi.Interfaces;
using ExoApi.Models;
using ExoApi.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace ExoApi.Controllers
{
    [Produces("application/json")]
    [Route("api/CadastrarUsuarios")]
    [ApiController]
    public class CadastrarUsuariosController : ControllerBase
    {
        private readonly IUsuarioRepository _usuarioRepository;

        public CadastrarUsuariosController(IUsuarioRepository usuarioRepository)
        {
            _usuarioRepository = usuarioRepository;
        }

        /// <summary>
        /// Cadastra um usuário e retorna seu identificador e e-mail.
        /// </summary>
        [HttpPost]
        [ProducesResponseType(typeof(UsuarioResponse), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        public async Task<ActionResult<UsuarioResponse>> Cadastrar(
            CadastrarUsuarioViewModel cadastro,
            CancellationToken cancellationToken)
        {
            var usuario = new Usuario
            {
                Email = cadastro.Email,
                Senha = cadastro.Senha
            };

            var cadastrado = await _usuarioRepository.Cadastrar(usuario, cancellationToken);

            if (!cadastrado)
            {
                return Conflict(new { msg = "Já existe um usuário cadastrado com este e-mail." });
            }

            return StatusCode(
                StatusCodes.Status201Created,
                new UsuarioResponse(usuario.Id, usuario.Email));
        }
    }
}
