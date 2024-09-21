using System;
using Microsoft.EntityFrameworkCore;
namespace Mega.Models.Entities;

[Keyless]
public class Clientes
{
        public required int IDCliente {  get; set; }
        public string Nombre {  get; set; }
        public required string Domicilio { get; set; }
        public required string Telefono { get; set; }

}
