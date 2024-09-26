using Microsoft.EntityFrameworkCore;

namespace Mega.Models.Reports;

public class TecnicoReport
{
    public string? NombreTecnico { get; set; }
    public int NoCuadrilla { get; set; }
    public DateTime Fecha { get; set; }
    public string? TrabajoRealizado { get; set; }
    public string? Servicio { get; set; }
    public int PuntosGenerados { get; set; }
    public int NumSuscriptor { get; set; }
    public string? NombreSuscriptor { get; set; }
    public string? Estatus { get; set; }
    public int? BonoSemanal { get; set; }
}
