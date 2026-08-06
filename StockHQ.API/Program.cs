using Microsoft.EntityFrameworkCore;
using StockHQ.API.Data;
using StockHQ.API.Interfaces;
using StockHQ.API.Repositories;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

//whenever an IProductRepository is needed, create a ProductRepository
builder.Services.AddScoped<IProductRepository, ProductRepository>();

//create option for StockHQDbContext constructor to use SQL Server
builder.Services.AddDbContext<StockHQDbContext>(options =>
options.UseSqlServer(
    builder.Configuration.GetConnectionString("DefaultConnection")));

// Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();