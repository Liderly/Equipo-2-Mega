using Microsoft.EntityFrameworkCore;
using Mega.Data;
using Microsoft.OpenApi.Models;
using System.Reflection;
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Version = "v1",
        Title = "MEGA API",
        Description = "Web API service for tecnicos weekly bonus calculation"
    });

    // Set the comments path for the Swagger JSON and UI.
    var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml"; //assambly name
    var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile); //from app location, take xml file
    c.IncludeXmlComments(xmlPath);
    //rely on Reflection for creating xml files matching with our webapi proj
});

builder.Services.AddControllers();

//DB context conn
builder.Services.AddDbContext<DataContext>(options => 
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c => {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "MEGA API"); //'v1' is for speficied 'version' at SwaggerDoc
        c.RoutePrefix = String.Empty; // goto swagger with root uri (escape '/swagger')
    });
}

app.UseHttpsRedirection();

app.MapControllers();

app.Run();
