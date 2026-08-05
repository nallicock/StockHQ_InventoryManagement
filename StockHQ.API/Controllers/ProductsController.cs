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
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
        {
            return Ok(new List<object>());
        }
    }
}
