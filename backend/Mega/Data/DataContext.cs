using System;
using Mega.Models.Entities;
using Microsoft.EntityFrameworkCore;
using Project.Models.Entities;
namespace Mega.Data;

public class DataContext : DbContext
{
    public DataContext(DbContextOptions<DataContext> options) : base(options)
    {
    }

    public DbSet<Tecnicos> Tecnicos { get; set; }
    public DbSet<Clientes> Cliente { get; set; } //'Cliente' es el designado en BD
    public DbSet<OrdenTrabajo> OrdenTrabajos { get; set; }

    //Connection string

  }
