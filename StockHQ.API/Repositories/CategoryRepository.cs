using Microsoft.EntityFrameworkCore;
using StockHQ.API.Data;
using StockHQ.API.Interfaces;
using StockHQ.API.Models;

namespace StockHQ.API.Repositories
{
    public class CategoryRepository : ICategoryRepository
    {
        private readonly StockHQDbContext _context;

        public CategoryRepository(StockHQDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Category>> GetAllAsync()
        {
            return await _context.Categories.ToListAsync();
        }

        public async Task<Category?> GetByIdAsync(int id)
        {
            return await _context.Categories.FindAsync(id);
        }

        public async Task<Category> AddAsync(Category category)
        {
            _context.Categories.Add(category);
            await _context.SaveChangesAsync();
            return category;
        }

        public async Task UpdateAsync(Category category)
        {
            _context.Categories.Update(category);

            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var category = await _context.Categories.FindAsync(id);

            if(category != null)
            {
                _context.Categories.Remove(category);

                await _context.SaveChangesAsync();
            }
        }
    }
}
