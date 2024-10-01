using Mega.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Project.Models.Entities;

namespace Mega.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CuadrillaController : ControllerBase
    {


        private readonly DataContext _context;

        public CuadrillaController(DataContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        //GET Method - All Cuadrillas
        [HttpGet]
        public async Task<ActionResult<Cuadrillas>> GetCuadrillasAsync()
        {
            var cuadrillas = await _context.Cuadrillas.ToListAsync();
            return Ok(cuadrillas);
        }
        

    }
}
