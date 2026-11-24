using ExoApi.Interfaces;
using ExoApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ExoApi.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class LivrosController : ControllerBase
    {
        private readonly ILivroRepository _livroRepository;

        public LivrosController(ILivroRepository livroRepository)
        {
            _livroRepository = livroRepository;
        }

        /// <summary>
        /// Lista todos os livros cadastrados
        /// </summary>
        [HttpGet]
        public IActionResult Listar()
        {
            try
            {
                return Ok(_livroRepository.Listar());
            }
            catch (Exception e)
            {
                return BadRequest(new { msg = e.Message });
            }
        }

        /// <summary>
        /// Busca um livro pelo Id
        /// </summary>
        [HttpGet("{id}")]
        public IActionResult BuscarPorId(int id)
        {
            try
            {
                Livro livro = _livroRepository.BuscarPorId(id);

                if (livro == null)
                    return NotFound(new { msg = "Livro não encontrado" });

                return Ok(livro);
            }
            catch (Exception e)
            {
                return BadRequest(new { msg = e.Message });
            }
        }

        /// <summary>
        /// Cadastra um novo livro
        /// </summary>
        [HttpPost]
        public IActionResult Cadastrar(Livro livro)
        {
            try
            {
                _livroRepository.Cadastrar(livro);
                return StatusCode(201, new { msg = "Livro cadastrado com sucesso" });
            }
            catch (Exception e)
            {
                return BadRequest(new { msg = e.Message });
            }
        }

        /// <summary>
        /// Atualiza um livro existente
        /// </summary>
        [HttpPut("{id}")]
        public IActionResult Atualizar(int id, Livro livro)
        {
            try
            {
                Livro livroBuscado = _livroRepository.BuscarPorId(id);

                if (livroBuscado == null)
                    return NotFound(new { msg = "Livro não encontrado" });

                _livroRepository.Atualizar(id, livro);
                return StatusCode(204);
            }
            catch (Exception e)
            {
                return BadRequest(new { msg = e.Message });
            }
        }

        /// <summary>
        /// Deleta um livro (somente usuários autenticados)
        /// </summary>
        [Authorize]
        [HttpDelete("{id}")]
        public IActionResult Deletar(int id)
        {
            try
            {
                Livro livroBuscado = _livroRepository.BuscarPorId(id);

                if (livroBuscado == null)
                    return NotFound(new { msg = "Livro não encontrado" });

                _livroRepository.Deletar(id);
                return StatusCode(204);
            }
            catch (Exception e)
            {
                return BadRequest(new { msg = e.Message });
            }
        }
    }
}
