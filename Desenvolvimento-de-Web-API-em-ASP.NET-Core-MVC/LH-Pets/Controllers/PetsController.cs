using Microsoft.AspNetCore.Mvc;
using LH_Pets.Models;

namespace LH_Pets.Controllers;

[ApiController]
[Route("api/pets")]
public class PetsController : ControllerBase
{
    private static readonly List<Pet> Pets = new();
    private static int _proximoId = 1;

    [HttpGet]
    public ActionResult<IEnumerable<Pet>> Get()
    {
        return Ok(Pets);
    }

    [HttpPost]
    public ActionResult<Pet> Post(Pet pet)
    {
        if (string.IsNullOrWhiteSpace(pet.Nome) ||
            string.IsNullOrWhiteSpace(pet.Especie) ||
            string.IsNullOrWhiteSpace(pet.Raca))
        {
            return BadRequest(
                "Nome, espécie e raça são obrigatórios."
            );
        }

        var clienteExiste = ClientesController.ConsultarCliente(pet.ClienteId);

        if (!clienteExiste)
        {
            return BadRequest("O ClienteId informado não existe.");
        }

        pet.Id = _proximoId++;
        Pets.Add(pet);

        return CreatedAtAction(
            nameof(Get),
            new { id = pet.Id },
            pet
        );
    }

    [HttpGet("cliente/{clienteId:int}")]
    public ActionResult<IEnumerable<Pet>> GetPorCliente(int clienteId)
    {
        var petsDoCliente = Pets
            .Where(p => p.ClienteId == clienteId)
            .ToList();

        return Ok(petsDoCliente);
    }
}