using Microsoft.AspNetCore.Mvc;
using StockHQ.API.Interfaces;
using StockHQ.API.Models;

namespace StockHQ.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategoriesController : ControllerBase
    {
        private readonly ICategoryService _categoryService;

        public CategoriesController(ICategoryService categoryService)
        {
            _categoryService = categoryService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Category>>> GetCategories()
        {
            var categories = await _categoryService.GetAllCategoriesAsync();

            return Ok(categories);
        }
    }
}
