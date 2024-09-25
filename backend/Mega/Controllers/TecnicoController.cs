using Mega.Data;
//using Microsoft.AspNetCore.Http;
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

        public TecnicoController(DataContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }
        

        //GET Method - All Tecnicos
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Tecnicos>>> GetAllTecnicos()
        {
            var allTecnicos = await _context.Tecnicos.ToListAsync();
            return Ok(allTecnicos);
        }

        //GET Method - single Tecnico
        [HttpGet]
        [Route("{idTecnico}")]
        public async Task<ActionResult<Tecnicos>> GetTecnicos(int idTecnico)
        {
            var tecnico = await _context.Tecnicos.FirstOrDefaultAsync(tecnicos => tecnicos.IDTecnico == idTecnico);

            if(tecnico is null)
            {
                return NotFound("tecnico no encontrado");
            }
            return Ok(tecnico);
        }

        //POST Method - Create Tecnico
        [HttpPost]
        public async Task<ActionResult<Tecnicos>> PostTecnico(Tecnicos tecnico)
        {
            _context.Tecnicos.Add(tecnico);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTecnicos), //endpoint name
                new { IDTecnico = tecnico.IDTecnico}, //anon obj def for needed id
                tecnico //the entire obj just created
            );
        }
    }
}
