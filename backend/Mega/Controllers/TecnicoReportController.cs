using Mega.Data;
using Mega.Models.Reports;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Mega.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TecnicoReportController : ControllerBase
    {
        private readonly DataContext _context;

        public TecnicoReportController(DataContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        //GET this tecnico
        /// <summary>
        /// Retrieve this week report for specified tecnico by its Id
        /// </summary>
        /// <param name="idTecnico"></param>
        /// <returns>Returns all OTs from specific tecnico</returns>
        [HttpGet]
        [Route("{idTecnico}")]
        public async Task<ActionResult<IEnumerable<TecnicoReport>>> GetTecnicoReport(int idTecnico)
        {
            var tecReport = await _context.TecnicoReport
                .FromSqlRaw(@"EXEC sp_TrabajoSemanalTecnico @IDTecnico = {0}", idTecnico)
                .ToListAsync();

            return Ok(tecReport);
        }


    }
}
