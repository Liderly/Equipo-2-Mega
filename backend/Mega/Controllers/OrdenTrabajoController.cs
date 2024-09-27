using Mega.Data;
using Mega.Models.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;

namespace Mega.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdenTrabajoController : ControllerBase
    {
        //Data Context
        private readonly DataContext _context;

        //CTOR
        public OrdenTrabajoController(DataContext contexto)
        {
            _context = contexto;
        }
        
        //GET Method - single OrdenTrabajo
        [HttpGet]
        [Route("{idOrdenTrabajo}")]
        public async Task<ActionResult<OrdenTrabajo>> GetOrdenTrabajo(int idOrdenTrabajo)
        {
            var miOrden = await _context.OrdenTrabajo.FirstOrDefaultAsync(ot => ot.IDOrden == idOrdenTrabajo);
            return Ok(miOrden);
        }


    }
}
