using Microsoft.EntityFrameworkCore;

namespace Project.Models.Entities
{

    [Keyless] 
   public class Tecnicos
    {
        public required int IDTecnico {  get; set; }
        public string Nombre {  get; set; }
        public required string Domicilio { get; set; }

    }
}