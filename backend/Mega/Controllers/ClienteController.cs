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

        public ClienteController(DataContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        //GET Method - all Cliente
        /// <summary>
        /// Get all clientes info
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        //[Route("")]
        public async Task<ActionResult<IEnumerable<Clientes>>> GetAllClients()
        {
            var allClients = await _context.Cliente.ToListAsync();
            return Ok(allClients);
        }

        //GET Method - single Cliente
        /// <summary>
        /// Get all cliente info, specific by their id 
        /// </summary>
        /// <param name="idCliente"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("{idCliente}")]
        public async Task<ActionResult<Clientes>> GetClientes(int idCliente)
        {
            var cliente = await _context.Cliente.FirstOrDefaultAsync(clien => clien.IDCliente == idCliente);
            return Ok(cliente);
        }

        //POST - Create Client
        /// <summary>
        /// Create new client registry
        /// </summary>
        /// <param name="cliente"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<ActionResult<Clientes>> PostUser(Clientes cliente)
        {
            _context.Cliente.Add(cliente);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetClientes),
                new { IDCliente = cliente.IDCliente },
                cliente
            );
        }

        //DELETE
        /// <summary>
        /// Permanently delete client
        /// </summary>
        /// <param name="idCliente"></param>
        /// <returns></returns>
        [HttpDelete("{idCliente}")]
        public async Task<ActionResult<Clientes>> DeleteUser(int idCliente)
        {
            var myUser = await _context.Cliente.FindAsync(idCliente);

            _context.Cliente.Remove(myUser);
            await _context.SaveChangesAsync();

            return Ok("User was deleted.");
        }

    }
}
