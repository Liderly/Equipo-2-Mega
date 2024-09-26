using System;
using Mega.Models.Entities;
using Mega.Models.Reports;
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
    public DbSet<TecnicoReport> TecnicoReport { get; set; }

    //Connection string


        protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<TecnicoReport>().HasNoKey(); // TecnicoReport class is keyless (noes table)
    }

  }
