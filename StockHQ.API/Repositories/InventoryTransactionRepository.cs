using Microsoft.EntityFrameworkCore;
using StockHQ.API.Data;
using StockHQ.API.Interfaces;
using StockHQ.API.Models;

namespace StockHQ.API.Repositories
{
    public class InventoryTransactionRepository : IInventoryTransactionRepository
    {
        private readonly StockHQDbContext _context;

        public InventoryTransactionRepository(StockHQDbContext context)
        {
            _context = context;
        }

        //add a transaction. Transaction model has ProductId FK
        public async Task AddAsync(InventoryTransaction transaction)
        {
            _context.InventoryTransactions.Add(transaction);

            await _context.SaveChangesAsync();
        }

        //get multiple transactions based on product id (transaction history)
        //can have more than one transaction per product
        public async Task<IEnumerable<InventoryTransaction>> GetByProductIdAsync(int productId)
        {
            return await _context.InventoryTransactions
                .Where(transaction => transaction.ProductId == productId)
                .ToListAsync();
        }
    }
}
