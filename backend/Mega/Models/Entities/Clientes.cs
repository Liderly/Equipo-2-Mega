using System;

namespace Mega.Models.Entities;

public class Clientes
{
        public required int IDCliente {  get; set; }
        public string Nombre {  get; set; }
        public required string Domicilio { get; set; }
        public required string Telefono { get; set; }

}
