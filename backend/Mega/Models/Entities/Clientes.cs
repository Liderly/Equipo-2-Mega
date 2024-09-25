using System;
using System.ComponentModel.DataAnnotations;
//using Microsoft.EntityFrameworkCore;
namespace Mega.Models.Entities;

public class Clientes
{
        [Key]
        public int IDCliente {  get; set; }
        
        [Required]
        public int NoSuscriptor { get; set; }

        [Required]
        [StringLength(100)]
        public string Nombre {  get; set; }

        [StringLength(100)]
        public string? Apellidos {  get; set; }
        
        [Required]
        public string Domicilio { get; set; }
        public required string Telefono { get; set; }
}
