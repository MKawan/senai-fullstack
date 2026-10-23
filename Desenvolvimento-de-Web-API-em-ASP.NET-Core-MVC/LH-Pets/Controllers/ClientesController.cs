using Microsoft.AspNetCore.Mvc;
using LH_Pets.Models;

namespace LH_Pets.Controllers;

[ApiController]
[Route("api/clientes")]
public class ClientesController : ControllerBase
{
    private static readonly List<Cliente> Clientes = new();
    private static int _proximoId = 1;

    [HttpGet]
    public ActionResult<IEnumerable<Cliente>> Get()
    {
        return Ok(Clientes);
    }

    [HttpPost]
    public ActionResult<Cliente> Post(Cliente cliente)
    {
        if (string.IsNullOrWhiteSpace(cliente.Nome) ||
            string.IsNullOrWhiteSpace(cliente.Cpf) ||
            string.IsNullOrWhiteSpace(cliente.Email))
        {
            return BadRequest("Nome, CPF e Email são obrigatórios.");
        }

        cliente.Id = _proximoId++;
        Clientes.Add(cliente);

        return CreatedAtAction(
            nameof(Get),
            new { id = cliente.Id },
            cliente
        );
    }
    public static bool ConsultarCliente(int id)
{
    return Clientes.Any(c => c.Id == id);
}
}