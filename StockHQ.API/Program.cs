using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using StockHQ.API.Data;
using StockHQ.API.Interfaces;
using StockHQ.API.Models;
using StockHQ.API.Repositories;
using StockHQ.API.Services;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

//whenever an IProductRepository is needed, create a ProductRepository
builder.Services.AddScoped<IProductRepository, ProductRepository>();
builder.Services.AddScoped<ICategoryRepository, CategoryRepository>();
builder.Services.AddScoped<IInventoryTransactionRepository, InventoryTransactionRepository>();
//when IProductService is requested, create a ProductService
builder.Services.AddScoped<IProductService, ProductService>();
builder.Services.AddScoped<ICategoryService, CategoryService>();
builder.Services.AddScoped<IInventoryTransactionService, InventoryTransactionService>();
//how to create authservice when something asks for IAuthService
//dependency injection
builder.Services.AddScoped<IAuthService, AuthService>();

//create option for StockHQDbContext constructor to use SQL Server
builder.Services.AddDbContext<StockHQDbContext>(options =>
options.UseSqlServer(
    builder.Configuration.GetConnectionString("DefaultConnection")));

//Use AppUser as our user and IdentityRole for roles.
//Store the users and roles in the StockHQ database
builder.Services.AddIdentity<AppUser, IdentityRole>()
    .AddEntityFrameworkStores<StockHQDbContext>()
    .AddDefaultTokenProviders();

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