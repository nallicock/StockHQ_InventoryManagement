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

        [HttpPost]
        //Product product is from request body - perform model binding
        public async Task<ActionResult<Product>> CreateProduct(Product product)
        {
            //track new product since we want to add to database
            //nothing saved yet
            _context.Products.Add(product);

            await _context.SaveChangesAsync();
            //EF generates SQL behind the scenes with the SaveChangesAsync() method
            //product then inserted into the database

            return CreatedAtAction(nameof(GetProducts), new { id = product.Id }, product);
            /*
            HTTP 201 Created HTTP response code returned with CreatedAtAction
            nameof() returns the name of something as a string, so in this case "GetProducts"
            new { id = product.Id } is an anonymous object - creates an object without creating a class because ASP.NET Core needs route values
            e.g. GET /api/products/5 -> the route parameter is 5
            product is the object returned in the response body.
            server says I created product #5 here is where you can find it 
            */
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {

            //async find product from within contextdb products with matching id
            var product = await _context.Products.FindAsync(id);

            //if not found, show 404
            if (product == null)
            {
                return NotFound();
            }

            //if found, 200 OK return code
            return Ok(product);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProduct(int id, Product product)
        //IActionResult - return some kind of HTTP response
        //ActionResult - return some kind of HTTP response and if successful it contains a Product
        {
            if (id != product.Id)
            {
                //400 response id is invalid
                return BadRequest();
            }

            _context.Entry(product).State = EntityState.Modified;
            //object exists in the db and values are changed

            await _context.SaveChangesAsync();
            //UPDATE is run in SQL and saved

            //204 response code normal to return no content after update because there is nothing left to do
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);
            //does this actually exist? SQL Select query is run in the backend

            if(product == null)
            {
                return NotFound();
                //404 response product is null
            }

            _context.Products.Remove(product);
            //do not delete row immediately. Track this product and delete when I save

            await _context.SaveChangesAsync();
            //delete this row now - EF Core sends the SQL to SQL Server.


            return NoContent();
            //Return 204 delete succeeded but there is nothing useful to send back.
        }
    }
}

