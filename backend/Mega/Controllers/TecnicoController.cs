using Mega.Data;
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
        /// <summary>
        /// Get all tecnicos info
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Tecnicos>>> GetAllTecnicos()
        {
            var allTecnicos = await _context.Tecnicos.ToListAsync();
            return Ok(allTecnicos);
        }

        //GET Method - single Tecnico
        /// <summary>
        /// Get all tecnico info, specified by their 'Numero de empleado'
        /// </summary>
        /// <param name="numEmpleado"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("{numEmpleado}")]
        public async Task<ActionResult<Tecnicos>> GetTecnicos(int numEmpleado)
        {
            var tecnico = await _context.Tecnicos.FirstOrDefaultAsync(tecnicos => tecnicos.NoEmpleado == numEmpleado);

            if(tecnico is null)
            {
                return NotFound("Tecnico no encontrado.");
            }
            return Ok(tecnico);
        }

        //POST Method - Create Tecnico
        /// <summary>
        /// Create new tecnico registry
        /// </summary>
        /// <param name="tecnico"></param>
        /// <returns></returns>
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
