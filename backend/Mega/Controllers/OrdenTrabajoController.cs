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


        
        //GET Method - single OrdenTrabajo
        [HttpGet]
        [Route("{idOrdenTrabajo}")]
        public async Task<ActionResult<OrdenTrabajo>> GetOrdenTrabajo(int idOrdenTrabajo)
        {
            var miOrden = await _context.OrdenTrabajos.FirstOrDefaultAsync(ot => ot.IDOrdenTrabajo == idOrdenTrabajo);
            return Ok(miOrden);
        }


    }
}
