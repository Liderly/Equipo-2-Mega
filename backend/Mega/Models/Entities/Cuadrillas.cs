using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace Project.Models.Entities
{
    [Keyless]
    public class Cuadrillas
    {
        [Key]
        public int IDCuadrilla {  get; set; }
        public int NoCuadrilla {  get; set; }

    }
}