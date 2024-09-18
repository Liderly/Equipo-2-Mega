using System;
using Microsoft.EntityFrameworkCore;
using Project.Models.Entities;

namespace Mega.Data;

public class DataContext : DbContext
{

  
    public DataContext(DbContextOptions<DataContext> options) : base(options)
    {

    }

    public DbSet<Tecnicos> Tecnicos { get; set; }

    //public DbSet<Trabajo> Trabajos { get; set; }

    //Connection string

  }
