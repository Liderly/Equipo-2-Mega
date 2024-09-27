using Mega.Data;
using Mega.Models.Reports;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Mega.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CuadrillaReportController : ControllerBase
    {
        private readonly DataContext _context;

        public CuadrillaReportController(DataContext context)
        {
            _context = context;
        }


        //GET cuadrilla report
        /// <summary>
        /// Returns work (OTs) done by a specific cuadrilla, and bonus applied
        /// </summary>
        /// <param name="idCuadrilla"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("{idCuadrilla}")]
        public async Task<ActionResult<IEnumerable<CuadrillaReport>>> GetCuadrillaReport(int idCuadrilla)
        {
            var cuadrillaRep = await _context.CuadrillaReports
                .FromSqlRaw(@"EXEC sp_CalculoDePuntaje @IDCuadrilla={0}", idCuadrilla)
                .ToListAsync();

            return Ok(cuadrillaRep);
        }


    }
}
