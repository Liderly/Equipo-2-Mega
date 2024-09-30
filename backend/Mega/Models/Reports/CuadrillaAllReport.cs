using System;

namespace Mega.Models.Reports;

public class CuadrillaAllReport
{
    public int NumeroOrden { get; set; }
    public int NumTecnico { get; set; }
    public string? NombreTecnico { get; set; }
    public int Cuadrilla { get; set; }
    public string? TrabajoRealizado { get; set; }
    public string? Servicio { get; set; }
    public int PuntosGenerados { get; set; }
    public int TotalPuntosPorTecnico { get; set; }
    public string? Estatus { get; set; }
    public int NumCliente { get; set; }
    public string? NombreSuscriptor { get; set; }
    public DateTime Fecha { get; set; }
    public int ValorPago { get; set; }

}