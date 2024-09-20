using Microsoft.EntityFrameworkCore;

namespace Project.Models.Entities
{
    [Keyless]
    public class Cuadrillas
    {
        public int Id {  get; set; }
        public int IdTecnico {  get; set; }

    }
}