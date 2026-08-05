using Microsoft.EntityFrameworkCore;
using StockHQ.API.Models;

namespace StockHQ.API.Data
{
    public class StockHQDbContext : DbContext
    {
        public StockHQDbContext(DbContextOptions<StockHQDbContext> options)
            : base(options)
        { 
        }

        public DbSet<Product> Products { get; set; }
    }
}
