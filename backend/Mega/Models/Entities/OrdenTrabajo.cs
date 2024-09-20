using System;
using Microsoft.EntityFrameworkCore;

namespace Mega.Models.Entities;

[Keyless]
public class OrdenTrabajo
{
 public int IDOrdenTrabajo { get; set; }
 public DateTime fechaInicio { get; set;}
 public DateTime fechaCierre { get; set;}

}
