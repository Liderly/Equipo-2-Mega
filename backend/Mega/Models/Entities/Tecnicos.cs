using System.ComponentModel.DataAnnotations;

namespace Project.Models.Entities
{

   public class Tecnicos
    {
        [Key]
        public required int IDTecnico {  get; set; }
        
        [Required]
        [StringLength(250)]
        public string? Nombre {  get; set; }
        
        [StringLength(200)]
        public string? Apellidos { get; set; }
        
        [Required]
        public int NoEmpleado { get; set; }
        public int IDCuadrilla { get; set; }

    }
}