using Mega.Data;
using Mega.Models.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;

namespace Mega.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClienteController : ControllerBase
    {
        //Data Context
        private readonly DataContext _context;


        //GET Method - single Cliente
        [HttpGet]
        [Route("{idCliente}")]
        public async Task<ActionResult<Clientes>> GetClientes(int idCliente)
        {
            var cliente = await _context.Clientes.FirstOrDefaultAsync(clien => clien.IDCliente == idCliente);
            return Ok(cliente);
        }

        //POST - Create Client
        [HttpPost]
        public async Task<ActionResult<Clientes>> PostUser(Clientes cliente)
        {
            _context.Clientes.Add(cliente);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetClientes),
                new { IDCliente = cliente.IDCliente },
                cliente
            );
        }

                //DELETE
        [HttpDelete("{idCliente}")]
        public async Task<ActionResult<Clientes>> DeleteUser(int idCliente)
        {
            var myUser = await _context.Clientes.FindAsync(idCliente);

            _context.Clientes.Remove(myUser);
            await _context.SaveChangesAsync();

            return Ok("User was deleted.");

        }


    }
}
