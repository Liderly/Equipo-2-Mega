using Mega.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Project.Models.Entities;

namespace Mega.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TecnicoController : ControllerBase
    {
        
        //Data Context
        private readonly DataContext _context;
            
        [HttpGet]
        [Route("{idTecnico}")]
        public async Task<ActionResult<Tecnicos>> GetTecnicos(int idTecnico)
        {
            var tecnico = await _context.Tecnicos.FirstOrDefaultAsync(tecnicos => tecnicos.userID == idTecnico);
            return Ok(tecnico);
        }
    }
}
