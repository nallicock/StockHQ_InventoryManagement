using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StockHQ.API.Data;
using StockHQ.API.Models;

namespace StockHQ.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        //hold db connection
        private readonly StockHQDbContext _context;

        public ProductsController(StockHQDbContext context)
        {
            //dependency injection - controller needs a StockHqDbContext
            //stored in Program.cs
            _context = context;
        }

        //GET endpoint
        [HttpGet]
        /*
         public method so everyone can access it
         async method so can use await
         returns a TASK since method is async - final result not returned immediately
         ActionResult will return an HTTP response code
         IEnumerable does not return only one Product but a collection
         GetProducts() is what this method is called
         */
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
        {
            //_context.Products represents the products table in sql server
            //StockHQDbContext
            //ToListAsync tells EF Core to run sql query and return each row from products table as a List<Product>
            var products = await _context.Products.ToListAsync();

            return Ok(products);
        }
    }
}
