using System;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace Mega.Models.Entities;

public class OrdenTrabajo
{
    [Key]
    public int IDOrden { get; set; }
    public DateTime fechaInicio { get; set;}
    // public DateTime fechaCierre { get; set;}
    public int IDEstatus { get; set; }
    public int IDCuadrilla { get; set; }
    public int IDCliente { get; set; }
    public int IDTrabajo { get; set; }
    public int IDServicio { get; set; }

}
